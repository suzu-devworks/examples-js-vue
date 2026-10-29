import jwt from 'jsonwebtoken'
import { describe, expect, it, vi } from 'vitest'

const { createError, readBody, useRuntimeConfig } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
  readBody: vi.fn(),
  useRuntimeConfig: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  readBody,
  useRuntimeConfig,
}))

import handler from '.././login'

describe('POST /api/phase4/login', () => {
  it('issues a signed token for valid credentials', async () => {
    useRuntimeConfig.mockReturnValue({ jwtSecret: 'test-secret' })
    readBody.mockResolvedValue({ username: 'admin', password: 'password' })

    const result = await handler({ req: { method: 'POST' } } as never)

    expect(result).toMatchObject({
      success: true,
      implementation: 'real',
      user: { id: 1, username: 'admin', role: 'administrator' },
    })
    expect(jwt.verify(result.token, 'test-secret')).toMatchObject({
      sub: 1,
      username: 'admin',
      role: 'administrator',
    })
  })

  it('supports the mock implementation and rejects invalid credentials or methods', async () => {
    useRuntimeConfig.mockReturnValue({ jwtSecret: 'test-secret' })
    readBody.mockResolvedValue({ username: 'admin', password: 'password', mode: 'mock' })
    const result = await handler({ req: { method: 'POST' } } as never)
    expect(result.token.split('.')).toHaveLength(3)

    readBody.mockResolvedValue({ username: 'admin', password: 'wrong' })
    await expect(handler({ req: { method: 'POST' } } as never)).rejects.toMatchObject({ statusCode: 401 })
    await expect(handler({ req: { method: 'GET' } } as never)).rejects.toMatchObject({ statusCode: 405 })
  })
})
