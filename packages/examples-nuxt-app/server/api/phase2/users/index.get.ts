import { defineEventHandler } from 'h3'
import { UserService } from '~~/server/services/user-service'

export default defineEventHandler((event) => {
  console.log(`[Nitro API] GET ${event.path} - Fetching full list`)

  return UserService.getAll()
})
