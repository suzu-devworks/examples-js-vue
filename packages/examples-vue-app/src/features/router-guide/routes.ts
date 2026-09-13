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
      // Navigation guards section
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
      // Route meta fields section
      {
        path: 'route-meta-fields',
        component: () => import('./advanced/views/RouteMetaFieldsView.vue'),
      },
      {
        path: 'route-meta-fields/posts',
        component: () => import('./advanced/views/PostsLayoutView.vue'),
        children: [
          {
            path: 'list',
            name: 'router.route-meta-fields.posts-list',
            component: () => import('./advanced/views/PostsListView.vue'),
            // anybody can read the list of posts
            meta: { requiresAuth: false },
          },
          {
            path: 'new',
            name: 'router.route-meta-fields.post-new',
            component: () => import('./advanced/views/PostNewView.vue'),
            // only authenticated users can create posts
            meta: { requiresAuth: true },
          },
          {
            path: ':id',
            name: 'router.route-meta-fields.post-detail',
            component: () => import('./advanced/views/PostsDetailView.vue'),
            // anybody can read a post
            meta: { requiresAuth: false },
          },
        ],
      },
    ],
  },
]

export default routes
