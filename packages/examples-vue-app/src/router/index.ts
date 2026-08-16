import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/GeneratedHomeView.vue"
import routesOfSoftwareDesign from "@/features/software-design/2020-09/routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },

    ...routesOfSoftwareDesign,
  ],
})

export default router
