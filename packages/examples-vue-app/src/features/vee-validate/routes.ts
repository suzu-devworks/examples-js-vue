import type { RouteRecordRaw } from 'vue-router'

const root = '/vee-validate'
const routes: RouteRecordRaw[] = [
  {
    path: root,
    component: () => import('./views/index.vue'),
    children: [
      { path: '', redirect: `${root}/zod` },
      { path: 'zod', component: () => import('./views/ZodView.vue') },
      { path: 'yup', component: () => import('./views/YupView.vue') },
    ],
  },
]

export default routes
