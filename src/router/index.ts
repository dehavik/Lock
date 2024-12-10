import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeView from '@/views/HomeView.vue'
import openLockView from '@/views/OpenLockView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/open',
      name: 'openLock',
      component: openLockView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'PageNotFound',
      component: NotFoundView,
    },
  ],
})

export default router
