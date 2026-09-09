import { createRouter, createWebHistory } from 'vue-router'

import { route as routeOfSoftwareDesign } from '@/features/software-design'
import { route as routeOfTemplate } from '@/features/template'
import { route as routeOfViteGuide } from '@/features/vite-guide'
import { route as routeOfVueGuide } from '@/features/vue-guide'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    ...routeOfTemplate,
    ...routeOfSoftwareDesign,
    ...routeOfVueGuide,
    ...routeOfViteGuide,
  ],
})

export default router
