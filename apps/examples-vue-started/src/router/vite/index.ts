const root = "/vite"
const routes = [
  {
    path: `${root}`,
    component: () => import("@/views/vite/IndexView.vue"),
  },
  {
    path: `${root}/webworker`,
    component: () => import("@/views/vite/WebWorkerView.vue"),
  },
]

export default routes
