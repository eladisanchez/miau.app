import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user: localStorage.getItem('user'),
      userId: localStorage.getItem('userId'),
      cookies: parseInt(localStorage.getItem('cookies'))
  },
  getters: {
      cookies: state => {
          var cookies = state.cookies
          if (!cookies) {  return 0 }
          return parseInt(cookies)
      },
      user: state => {
          return state.user ? state.user : 'Anònim/a'
      }
  },
  mutations: {
      addCookies (state, payload) {
          state.cookies += parseInt(payload)
          localStorage.setItem('cookies',state.cookies)
      }
  },
  actions: {}
});