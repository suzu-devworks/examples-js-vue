import jwt from 'jsonwebtoken'
import { defineEventHandler, getRequestURL, getRequestHeader, createError, useRuntimeConfig } from 'nuxt/server'

export default defineEventHandler((event) => {
  const reqUrl = getRequestURL(event)
  const pathname = reqUrl.pathname

  // 1. Skip validation for public APIs that do not require authentication (such as login)
  const publicPaths = ['/api/phase4/login']
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return // Skip processing and proceed to each handler
  }

  // 2. Force validation only when fetch target is phase4 API (adjust as necessary)
  if (pathname.startsWith('/api/phase4/')) {
    const authHeader = getRequestHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Missing or invalid authorization header',
      })
    }

    const token = authHeader.replace('Bearer ', '')
    const config = useRuntimeConfig()
    const jwtSecret = config.jwtSecret || 'fallback-secret-for-safety'

    try {
      // 3. Strictly verify JWT on the server side
      const decoded = jwt.verify(token, jwtSecret)

      // 4. By having verified user information in event.context,
      // You can now retrieve user information without having to validate it in each subsequent API handler
      event.context.auth = decoded
    } catch (error) {
      console.error('JWT verification failed:', error)
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Token expired or invalid signature',
      })
    }
  }
})
