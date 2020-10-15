import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => authMiddleware(next, false, '/')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/account/verify/:userID/:verifyToken',
    name: 'AccountVerify',
    component: () => import('../views/AccountVerify.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

function authMiddleware(next, redirectOnFail = true, failRedirect = '/'){
  let access_token = Vue.$cookies.get('access-token');
  let refresh_token = Vue.$cookies.get('refresh-token');
  //If the access token is valid
  if(accessTokenValidation(access_token)) {
    //Process redirection
    if(redirectOnFail) next();
    else next({ path: failRedirect});
  //If the access token is not valid
  }else{
    //Try to create a new one with the refresh token
    access_token = tryRefreshToken(refresh_token);
    //If the new access token is valid
    if(accessTokenValidation(access_token)){
      //Store it in cookies
      Vue.$cookies.set('access-token', access_token, '1h');
      //Redirect
      if(redirectOnFail) next();
      else next({ path: failRedirect});
    //If the new token is not valid
    }else{
      //Redirect to failure
      if(redirectOnFail) next({ path: failRedirect});
      else next();
    }
  }
}

function tryRefreshToken(refresh_token){
  axios({
    method: "post",
    url: 'http://localhost:3001/api/auth/token',
    data: {
      "token": refresh_token
    }
  })
    .then((res) => {
      console.log(res);
      return res.access_token;
    })
    .catch(err => {
      if(err.response.status !== 200) 
        return null;
    });
}

function accessTokenValidation(access_token){
  axios({
    method: 'post',
    url:'http://localhost:3001/api/auth/check',
    headers: {
      'Authorization': access_token
    }
  })
    .then(() => {
      return true;
    })
    .catch(err => {
      if(err.response.status !== 200) 
        return false;
    });
}