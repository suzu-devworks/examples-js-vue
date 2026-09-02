import type { RouteRecordRaw } from 'vue-router'

const root = '/vite'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    component: () => import('./views/IndexView.vue'),
  },
  {
    path: `${root}/worker`,
    component: () => import('./views/WebWorkerView.vue'),
  },
  {
    path: `${root}/env`,
    component: () => import('./views/EnvVariables.vue'),
  },
]

export default routes
