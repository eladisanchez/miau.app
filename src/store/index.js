import Vue from 'vue';
import Vuex from 'vuex';
import 'whatwg-fetch';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: localStorage.getItem('user'),
		userId: localStorage.getItem('userId'),
		cookies: parseInt(localStorage.getItem('cookies'))
	},
	getters: {
		cookies: (state) => {
			var cookies = state.cookies;
			if (!cookies) {
				return 0;
			}
			return parseInt(cookies);
		},
		user: (state) => {
			return state.user ? state.user : 'Anònim/a';
		},
		userId: (state) => {
			return state.userId ? state.userId : false;
		}
	},
	mutations: {
		ADD_COOKIES(state, payload) {
			state.cookies += parseInt(payload);
			localStorage.setItem('cookies', state.cookies);
		},
		SET_USER_DATA(state, payload) {
			state.cookies = payload.galetes;
			state.user = payload.nom;
			state.userId = payload.userid;
			localStorage.setItem('cookies', payload.galetes);
			localStorage.setItem('user', payload.nom);
			localStorage.setItem('userId', payload.userid);
		},
		CLEAR_USER_DATA(state) {
			localStorage.clear();
			state.cookies = 0;
			state.user = null;
			state.userId = null;
		}
	},
	actions: {
		login({ commit, state },user) {
			// Generar una ID d'usuari si no en té
			if (!state.userId) {
				let randomHash = Math.random().toString(36).substr(2);
				let timeHash = (new Date().getTime() - 1589994063336).toString(36);
				var userId = randomHash + timeHash;
				userId = userId.substr(userId.length - 12);
				if (user && user != 'Ningú') {
					user = user.substring(0, 25);
				} else {
					user = null;
				}
				commit('SET_USER_DATA', {
					userid: userId,
					nom: user,
					galetes: 0
				});
			}
		},

		saveCookies({ commit, state }, cookies) {
			fetch('/api/index.php', {
				method: 'POST',
				body: JSON.stringify({
					userid: state.userId,
					nom: state.user,
					galetes: cookies
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					commit('ADD_COOKIES', json.galetes);
				});
		},

		loadUserData({ commit }, userid) {
			fetch('https://miau.app/api/loadUser/', {
				method: 'POST',
				body: JSON.stringify({
					userid: userid
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					commit('SET_USER_DATA', json);
					alert('Hola ' + json.nom);
				});
		}
	}
});
