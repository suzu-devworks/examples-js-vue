import type { RouteRecordRaw } from 'vue-router'

const root = '/vue'
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    redirect: '/vue/components/registration',
  },
  {
    path: `${root}/components`,
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/vue/components/registration',
      },
      {
        path: 'registration',
        component: () => import('./components-in-depth/views/RegistrationView.vue'),
      },
      {
        path: 'props',
        component: () => import('./components-in-depth/views/PropsView.vue'),
      },
      {
        path: 'events',
        component: () => import('./components-in-depth/views/EventsView.vue'),
      },
      {
        path: 'v-models',
        component: () => import('./components-in-depth/views/VModelsView.vue'),
      },
      {
        path: 'fallthrough',
        component: () => import('./components-in-depth/views/FallthroughView.vue'),
      },
      {
        path: 'slots',
        component: () => import('./components-in-depth/views/SlotsView.vue'),
      },
      {
        path: 'provide-inject',
        component: () => import('./components-in-depth/views/ProvideInjectView.vue'),
      },
    ],
  },
]

export default routes
