import { createError, defineEventHandler, readBody, setResponseStatus } from 'nuxt/server'
import z from 'zod'
import { UserCreateSchema, UserService } from '~~/server/services/user-service'

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id
  const method = event.req.method

  if (method === 'PUT') {
    console.log(`[Nitro API] PUT ${event.url.pathname} - Updating record`)

    const body = await readBody(event)
    const result = UserCreateSchema.safeParse(body)
    if (!result.success) {
      throw createError({ statusCode: 400, data: z.flattenError(result.error).fieldErrors })
    }

    const updated = UserService.update(userId || '', result.data)

    if (!updated) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    setResponseStatus(event, 204)
    return null
  }

  if (method === 'DELETE') {
    console.log(`[Nitro API] DELETE ${event.url.pathname} - Deleting record`)
    const deleted = UserService.delete(userId || '')
    if (!deleted) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }
    setResponseStatus(event, 204)
    return null
  }

  throw createError({
    statusCode: 405,
    statusMessage: `Method ${method} Not Allowed`,
  })
})
