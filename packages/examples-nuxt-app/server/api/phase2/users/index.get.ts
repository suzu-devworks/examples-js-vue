import { defineEventHandler } from 'nuxt/server'
import { UserService } from '~~/server/services/user-service'

export default defineEventHandler((event) => {
  console.log(`[Nitro API] GET ${event.url.pathname} - Fetching full list`)

  return UserService.getAll()
})
