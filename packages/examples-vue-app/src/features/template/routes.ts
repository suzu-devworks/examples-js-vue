import type { RouteRecordRaw } from 'vue-router'

const root = '/templates'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    component: () => import('./views/index.vue'),
  },
]

export default routes
