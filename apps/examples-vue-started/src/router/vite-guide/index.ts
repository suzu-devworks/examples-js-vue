import type { RouteRecordRaw } from "vue-router"

const root = "/vite"
const routes: RouteRecordRaw[] = [
  {
    path: `${root}`,
    component: () => import("@/views/vite-guide/IndexView.vue"),
  },
  {
    path: `${root}/webworker`,
    component: () => import("@/views/vite-guide/WebWorkerView.vue"),
  },
  {
    path: `${root}/env`,
    component: () => import("@/views/vite-guide/EnvVariables.vue"),
  },
]

export default routes
