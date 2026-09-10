import type { RouteRecordRaw } from 'vue-router'

const root = '/router'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    redirect: '/router/guide/advanced/navigation-guards',
  },
  {
    path: `${root}/guide/advanced`,
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/router/guide/advanced/navigation-guards',
      },
      {
        path: 'navigation-guards',
        component: () => import('./advanced/views/NavigationGuards.vue'),
      },
    ],
  },
]

export default routes
