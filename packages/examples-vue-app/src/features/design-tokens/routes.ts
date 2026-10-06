import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/design-tokens',
    component: () => import('./views/VariablesView.vue'),
  },
]

export default routes
