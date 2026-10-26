import { createError, defineEventHandler, readBody, setResponseStatus } from 'h3'
import z from 'zod'
import { UserCreateSchema, UserService } from '~~/server/services/user-service'

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id
  const method = event.method

  if (method === 'PUT') {
    console.log(`[Nitro API] PUT ${event.path} - Updating record`)

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
    console.log(`[Nitro API] DELETE ${event.path} - Deleting record`)
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
