import { createRouter, createWebHistory } from 'vue-router'

import { route as routeOfAuth, requireAuth } from '@/features/auth'
import { route as routeOfRouterGuide } from '@/features/router-guide'
import { route as routeOfSoftwareDesign } from '@/features/software-design'
import { route as routeOfTemplate } from '@/features/template'
import { route as routeOfViteGuide } from '@/features/vite-guide'
import { route as routeOfVueGuide } from '@/features/vue-guide'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    ...routeOfAuth,
    ...routeOfTemplate,
    ...routeOfSoftwareDesign,
    ...routeOfVueGuide,
    ...routeOfRouterGuide,
    ...routeOfViteGuide,
  ],
})

router.beforeEach(requireAuth)

export default router
