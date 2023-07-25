// https://nuxt.com/docs/getting-started/routing
import { RouteLocationNormalized } from "vue-router"

function isAuthenticated(from: RouteLocationNormalized): Boolean {
  if (from.name === "index") {
    return true
  }
  return false
}

// Nuxt provides a customizable route middleware framework.
export default defineNuxtRouteMiddleware((_to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated(from) === false) {
    return navigateTo("/login")
  }
})
