import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import GeneratedView from "@/views/GeneratedHomeView.vue"
import routesOfSoftwareDesign from "@/features/software-design/2020-09/routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/generated', component: GeneratedView },

    ...routesOfSoftwareDesign,
  ],
})

export default router
