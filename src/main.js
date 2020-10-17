import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import VuePageTransition from 'vue-page-transition'
import './assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueCookies);
Vue.use(VuePageTransition);

Vue.$cookies.config('7d');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
