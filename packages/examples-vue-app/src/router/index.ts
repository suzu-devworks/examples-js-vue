import { createRouter, createWebHistory } from 'vue-router'

import { route as routeOfSoftwareDesign } from '@/features/software-design'
import { route as routeOfTemplate } from '@/features/template'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: HomeView }, ...routeOfTemplate, ...routeOfSoftwareDesign],
})

export default router
