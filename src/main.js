import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'

import router from './router'
import store from './store'
import i18n from './i18n'

import './filters'

import './scss/style.scss'

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

import './viewport-min-width.js'