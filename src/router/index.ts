import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFound.vue'
import HomeView from '@/views/Home.vue'
import openLockView from '@/views/OpenLock.vue'

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
