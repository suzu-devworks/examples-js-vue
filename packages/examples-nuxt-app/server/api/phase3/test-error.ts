import { createError, defineEventHandler, getQuery } from 'nuxt/server'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const code = Number(query.code) || 500

  if (code === 401) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized access',
    })
  }

  if (code === 500) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed',
    })
  }

  return {
    success: true,
    message: 'Request succeeded without any errors!',
  }
})
