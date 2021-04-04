import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Miau from '../views/Miau';
import User from '../views/User';
import Ranking from '../views/Ranking';
import Cat from '../views/Cat';
import Boles from '../views/boles/Boles';
import Nonogram from '../views/nonogram/Nonogram'
import Mastermind from '../views/mastermind/Mastermind'
import Pescamines from '../views/pescamines/Pescamines'

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Home, meta: { title: 'miau.app' } },
	{ path: '/miau', component: Miau, meta: { title: 'miau.app' } },
	{ path: '/cat', component: Cat, meta: { title: 'miau.app | El Mixu' } },
	{ path: '/ranking', component: Ranking, meta: { title: 'miau.app | Rànquing' } },
	{ path: '/user', component: User, meta: { title: 'miau.app | Usuari' } },
	{ path: '/boles', component: Boles, meta: { title: "miau.app | Les Boles de l'Eladi" } },
	{ path: '/boles/:ristra', component: Boles, meta: { title: "miau.app | Les Boles de l'Eladi" }, props: true },
	{ path: '/nonogram', component: Nonogram, meta: { title: "miau.app | Nonogram" } },
	{ path: '/mastermind', component: Mastermind, meta: { title: "miau.app | Mastermind" } },
	{ path: '/pescamines', component: Pescamines, meta: { title: "miau.app | Pescamines" } }
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});

export default router;