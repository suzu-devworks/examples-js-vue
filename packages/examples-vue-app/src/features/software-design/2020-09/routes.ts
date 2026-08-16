import type { RouteRecordRaw } from "vue-router"

const root = "/software-design/2020-09"
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    component: () => import("./views/index.vue"),
  },
  {
    path: `${root}/step2-1`,
    component: () => import("./views/CounterView.vue"),
  },
  {
    path: `${root}/step2-2/pages/:page`,
    alias: "/paging/pages/:page",
    component: () => import("./views/PagingView.vue"),
  },
  {
    path: `${root}/step3-1`,
    component: () => import("./views/StoredCounterView.vue"),
  },
  {
    path: `${root}/step3-2`,
    component: () => import("./views/ProfileView.vue"),
  },
]

export default routes
