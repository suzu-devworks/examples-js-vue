import { RouteLocationNormalized } from "vue-router"

function isAuthenticated(from: RouteLocationNormalized): Boolean {
  if (from.name === "index") {
    return true
  }
  return false
}

export default defineNuxtRouteMiddleware((_to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated(from) === false) {
    return navigateTo("/login")
  }
})
