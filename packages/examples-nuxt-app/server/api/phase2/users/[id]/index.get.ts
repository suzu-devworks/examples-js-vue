import { UserService } from '~~/server/services/user-service'

import { createError, defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const userId = event.context.params?.id
  console.log(`[Nitro API] GET /api/phase2/users/${userId} - Fetching single record`)

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
  }

  const user = UserService.getById(userId)

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return user
})
