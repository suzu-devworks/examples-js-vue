import { createError, defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'
import { useRuntimeConfig } from 'nitropack/runtime'

// Flags and arguments to switch between mock implementation and practical implementation
// (this time we selected practical implementation)
type ImplementationType = 'mock' | 'real'

function generateToken(
  userId: number,
  username: string,
  role: string,
  secret: string,
  type: ImplementationType = 'real',
) {
  if (type === 'mock') {
    // Simple mock JWT-like string proposed in the past
    // (not used this time, default to practical implementation)
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
    const payload = Buffer.from(JSON.stringify({ sub: userId, username, role })).toString('base64url')
    return `${header}.${payload}.mock-signature`
  }

  // [Practical implementation] Use jsonwebtoken library
  return jwt.sign(
    {
      sub: userId,
      username,
      role,
    },
    secret,
    { expiresIn: '1h' },
  )
}

function isValidCredentials(username: string | undefined, password: string | undefined) {
  // [!IMPORTANT]
  // For demonstration purposes, the provided username and password are verified against hardcoded credentials.
  // Do not use this in an actual implementation.
  return username === 'admin' && password === 'password'
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    })
  }

  // Get JWT_SECRET from runtimeConfig at runtime
  const config = useRuntimeConfig(event)
  const jwtSecret = config.jwtSecret

  const body = await readBody<{ username?: string; password?: string; mode?: ImplementationType }>(event)
  const username = body?.username
  const password = body?.password
  // Allow switching by argument or request body (default is 'real')
  const mode: ImplementationType = body?.mode || 'real'

  // Authentication check
  if (isValidCredentials(username, password)) {
    const token = generateToken(1, 'admin', 'administrator', jwtSecret, mode)

    return {
      success: true,
      implementation: mode,
      token,
      user: {
        id: 1,
        username: 'admin',
        role: 'administrator',
      },
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid username or password',
  })
})
