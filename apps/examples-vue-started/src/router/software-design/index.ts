const routes = [
  {
    path: "/software-design",
    component: () => import("@/views/software-design/IndexView.vue"),
  },
  {
    path: "/software-design/step2-1",
    component: () => import("@/views/software-design/202009/CounterView.vue"),
  },
  {
    path: "/software-design/step2-2/:page",
    alias: "/paging/:page",
    component: () => import("@/views/software-design/202009/PagingView.vue"),
  },
  {
    path: "/software-design/step3-1",
    component: () => import("@/views/software-design/202009/StoredCounterView.vue"),
  },
  {
    path: "/software-design/step3-2",
    component: () => import("@/views/software-design/202009/ProfileView.vue"),
  },
]

export default routes
