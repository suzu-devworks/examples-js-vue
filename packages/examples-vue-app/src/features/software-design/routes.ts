import type { RouteRecordRaw } from 'vue-router'

const root = '/software-design'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    redirect: '/software-design/2020-09/step1',
  },
  {
    path: `${root}/2020-09`,
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/software-design/2020-09/step1',
      },
      {
        path: 'step1',
        component: () => import('./2020-09/views/Step1View.vue'),
      },
      {
        path: 'step2',
        component: () => import('./2020-09/views/Step2View.vue'),
        children: [
          {
            path: '',
            redirect: '/software-design/2020-09/step2/counter',
          },
          {
            path: 'counter',
            component: () => import('./2020-09/views/Step2CounterView.vue'),
          },
          {
            path: `pages/:page`,
            alias: '/pagination/pages/:page',
            component: () => import('./2020-09/views/Step2PaginationView.vue'),
          },
        ],
      },
      {
        path: 'step3',
        component: () => import('./2020-09/views/Step3View.vue'),
        children: [
          {
            path: '',
            redirect: '/software-design/2020-09/step3/counter',
          },
          {
            path: 'counter',
            component: () => import('./2020-09/views/Step3StoredCounterView.vue'),
          },
          {
            path: 'profile',
            component: () => import('./2020-09/views/Step3ProfileView.vue'),
          },
        ],
      },
    ],
  },
]

export default routes
