import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthMiddleware from '../middleware/AuthMiddleware.js';

let am = new AuthMiddleware();
Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Home', component: Home
  },
  {
    path: '/sort/:sortBy?', name: 'HomeSorted', component: Home
  },
  {
    path: '/products/:id', name: 'Product',
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue')
  },
  {
    path: '/login', name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => am.isNotAuthenticated(next)
  },
  {
    path: '/reset-password', name: 'ResetPassword',
    component: () => import('../views/ResetPasswordRequest.vue'),
    beforeEnter: (to, from, next) => am.isNotAuthenticated(next)
  },
  {
    path: '/register', name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, from, next) => am.isNotAuthenticated(next)
  },
  {
    path: '/account', name: 'Account',
    component: () => import('../views/Account.vue'),
    beforeEnter: (to, from, next) => am.isAuthenticated(next)
  },
  {
    path: '/create-submission', name: 'CreateSubmission',
    component: () => import('../views/CreateSubmission.vue'),
    beforeEnter: (to, from, next) => am.isAuthenticated(next)
  },
  {
    path: '/edit-submission/:id', name: 'EditSubmission',
    component: () => import('../views/EditSubmission.vue'),
    beforeEnter: (to, from, next) => am.isAuthenticated(next)
  },
  {
    path: '/admin', name: 'Admin',
    component: () => import('../views/Admin.vue'),
    beforeEnter: (to, from, next) => am.isAdmin(next)
  },
  {
    path: '/account/verify/:userID/:verifyToken', name: 'AccountVerify',
    component: () => import('../views/AccountVerify.vue')
  },
  {
    path: '/password-reset/:userID/:verifyToken', name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router