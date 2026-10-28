import { defineNuxtRouteMiddleware, navigateTo, useCookie } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to /* from */) => {
  const token = useCookie<string | null>('auth_token')

  if (!token.value) {
    // When skipping to the login screen,
    // include the path you originally wanted to go to in the query
    return navigateTo({
      path: '/phase4/login',
      query: { redirect: to.fullPath },
    })
  }
})
