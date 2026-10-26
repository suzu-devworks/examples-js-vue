import { createError, defineEventHandler, readBody } from 'h3'
import z from 'zod'
import { UserCreateSchema, UserService } from '~~/server/services/user-service'

export default defineEventHandler(async (event) => {
  console.log(`[Nitro API] POST ${event.path} - Creating record`)
  const body = await readBody(event)

  const result = UserCreateSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Failed',
      data: z.flattenError(result.error).fieldErrors,
    })
  }

  const newUser = UserService.create(result.data)

  return { id: newUser.id }
})
