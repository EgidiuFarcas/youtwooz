import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthMiddleware from '../middleware/AuthMiddleware.js';

let am = new AuthMiddleware();
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
    beforeEnter: (to, from, next) => am.isNotAuthenticated(next)
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, from, next) => am.isNotAuthenticated(next)
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    beforeEnter: (to, from, next) => am.isAuthenticated(next)
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    beforeEnter: (to, from, next) => am.isAdmin(next)
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