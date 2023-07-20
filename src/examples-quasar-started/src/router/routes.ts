import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: { title: 'Home - example' },
  },
  {
    path: '/next',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/NextPage.vue') }],
    meta: { title: 'Next - example' },
  },

  {
    path: '/quasar',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/QuasarIndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
