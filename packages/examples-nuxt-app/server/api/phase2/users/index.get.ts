import { UserService } from '~~/server/services/user-service'

import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  console.log(`[Nitro API] GET ${event.path} - Fetching full list`)

  return UserService.getAll()
})
