import type { RouteRecordRaw } from 'vue-router'

const root = '/vite'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    redirect: '/vite/guide/env-and-mode',
  },
  {
    path: `${root}/guide`,
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/vite/guide/env-and-mode',
      },
      {
        path: 'env-and-mode',
        component: () => import('./views/EnvAndModeView.vue'),
      },
      {
        path: 'features',
        component: () => import('./views/FeaturesView.vue'),
      },
    ],
  },
]

export default routes
