import jwt from 'jsonwebtoken'
import { createError, defineEventHandler, getRequestHeader, getQuery, useRuntimeConfig } from 'nuxt/server'

type ImplementationType = 'mock' | 'real'

type TokenPayload = {
  sub: number
  username: string
  role: string
}

function isTokenPayload(payload: unknown): payload is TokenPayload {
  if (typeof payload !== 'object' || payload === null) return false

  return (
    'sub' in payload &&
    typeof payload.sub === 'number' &&
    'username' in payload &&
    typeof payload.username === 'string' &&
    'role' in payload &&
    typeof payload.role === 'string'
  )
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const jwtSecret = config.jwtSecret

  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing or malformed authorization token',
    })
  }

  const token = authHeader.replace('Bearer ', '')

  // Allow mode to be received in query parameters, headers, etc. (default is 'real')
  const query = getQuery(event)
  const mode = (query.mode as ImplementationType) || 'real'

  try {
    if (mode === 'mock') {
      // Simple processing of mock validation
      const parts = token.split('.')
      const payloadPart = parts[1]
      if (parts.length !== 3 || !payloadPart) throw new Error('Invalid mock token structure')
      const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf-8'))
      return {
        authenticated: true,
        implementation: 'mock',
        user: { id: payload.sub, username: payload.username, role: payload.role },
      }
    }

    // [Practical implementation] Strict signature and expiration date verification using jsonwebtoken
    const decoded = jwt.verify(token, jwtSecret)
    if (!isTokenPayload(decoded)) {
      throw new Error('Invalid JWT payload')
    }

    return {
      authenticated: true,
      implementation: 'real',
      message: 'JWT token is valid',
      user: {
        id: decoded.sub,
        username: decoded.username,
        role: decoded.role,
      },
    }
  } catch (error) {
    console.error('JWT verification error:', error)

    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired JWT token',
    })
  }
})
