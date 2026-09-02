import type { RouteRecordRaw } from 'vue-router'

const root = '/vue'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    component: () => import('./views/IndexView.vue'),
  },
  {
    path: `${root}/components`,
    component: () => import('./views/ComponentsInDepthView.vue'),
  },
]

export default routes
