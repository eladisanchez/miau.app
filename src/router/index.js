import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Miau from '../views/Miau';
import User from '../views/User';
import Cat from '../views/Cat';
import Boles from '../views/boles/Boles';

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Home, meta: { title: 'miau.app' } },
	{ path: '/miau', component: Miau, meta: { title: 'miau.app' } },
	{ path: '/cat', component: Cat, meta: { title: 'miau.app' } },
	{ path: '/user', component: User, meta: { title: 'miau.app' } },
	{ path: '/boles', component: Boles, meta: { title: "miau.app | Les Boles de l'Eladi" } }
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});

export default router;