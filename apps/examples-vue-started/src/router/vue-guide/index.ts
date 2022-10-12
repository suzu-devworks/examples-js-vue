import type { RouteRecordRaw } from "vue-router"

const root = "/vue"
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    component: () => import("@/views/vue-guide/IndexView.vue"),
  },
  {
    path: `${root}/components`,
    component: () => import("@/views/vue-guide/ComponentsInDepthView.vue"),
  },
]

export default routes
