import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '@/views/AddView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
				title: "校园交易平台",
			},
    },
    {
      path: '/publish',
      name: 'publish',
      component: AddView,
      meta: {
				title: "发闲置",
			},
    },
  ],
})

router.beforeEach((to, from, next) => {
  const title = to.meta?.title;
  if (title) document.title = title;
 	next();
});

export default router
