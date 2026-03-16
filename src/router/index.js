import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '@/views/AddView.vue';
import MessageView from '@/views/MessageView.vue';
import PersonalView from '@/views/PersonalView.vue';
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
    {
      path: '/message',
      name: 'message',
      component: MessageView,
      meta: {
				title: "聊天",
			},
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalView,
      meta: {
				title: "个人页",
			},
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === "/personal") {
    document.title = to.query.name || "个人页";
  } else {
    to.meta?.title && (document.title = to.meta.title);
  }
 	next();
});

export default router
