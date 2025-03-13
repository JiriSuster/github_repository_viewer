import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/router/pages/HomeView.vue'
import HistoryView from '@/router/pages/HistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
    },
  ],
})

export default router
