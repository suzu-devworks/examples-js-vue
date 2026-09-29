import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/interactions',
    component: () => import('./views/index.vue'),
  },
]

export default routes
