const root = "/software-design"
const routes = [
  {
    path: `${root}`,
    component: () => import("@/views/software-design/IndexView.vue"),
  },
  {
    path: `${root}/step2-1`,
    component: () => import("@/views/software-design/202009/CounterView.vue"),
  },
  {
    path: `${root}/step2-2/:page`,
    alias: "/paging/:page",
    component: () => import("@/views/software-design/202009/PagingView.vue"),
  },
  {
    path: `${root}/step3-1`,
    component: () => import("@/views/software-design/202009/StoredCounterView.vue"),
  },
  {
    path: `${root}/step3-2`,
    component: () => import("@/views/software-design/202009/ProfileView.vue"),
  },
]

export default routes
