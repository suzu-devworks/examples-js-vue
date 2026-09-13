import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import { useAuthStore } from './stores/useAuthStore.ts'

const root = '/auth'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    name: 'auth.login',
    component: () => import('./views/LoginView.vue'),
  },
]
export default routes

export function requireAuth(to: RouteLocationNormalized) {
  const { isAuthenticated } = useAuthStore()

  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !isAuthenticated()) {
    console.log('User is not authenticated, redirecting to login.')
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      name: 'auth.login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
}
