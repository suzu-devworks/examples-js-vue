import type { RouteRecordRaw } from 'vue-router'

import { removeHash, removeQueryParams } from './advanced'
import data from './advanced/data/spots.json'

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
        component: () => import('./advanced/views/NavigationGuardsView.vue'),
      },
      {
        path: 'navigation-guards/spots/:id',
        name: 'router.navigation-guards.in-components',
        component: () => import('./advanced/views/SpotView.vue'),
        beforeEnter: (to) => {
          const exists = data.spots.some((spot) => spot.id === Number(to.params['id']))
          if (!exists) {
            console.warn(`Spot with id ${to.params['id']} does not exist.`)
            // handle the case when the spot does not exist
            return false
          }
        },
      },
      {
        path: 'navigation-guards/users/:id',
        component: () => import('./advanced/views/UserDetailsView.vue'),
        beforeEnter: [removeQueryParams, removeHash],
      },
      {
        path: 'navigation-guards/about',
        component: () => import('./advanced/views/UserDetailsView.vue'),
        beforeEnter: [removeQueryParams],
      },
    ],
  },
]

export default routes
