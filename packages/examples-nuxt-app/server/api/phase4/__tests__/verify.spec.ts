import jwt from 'jsonwebtoken'
import { describe, expect, it, vi } from 'vitest'

const { createError, getQuery, getRequestHeader, useRuntimeConfig } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
  getQuery: vi.fn(),
  getRequestHeader: vi.fn(),
  useRuntimeConfig: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  getQuery,
  getRequestHeader,
  useRuntimeConfig,
}))

import handler from '.././verify'

describe('GET /api/phase4/verify', () => {
  it('verifies a signed JWT and returns user details', () => {
    useRuntimeConfig.mockReturnValue({ jwtSecret: 'test-secret' })
    getRequestHeader.mockReturnValue(
      `Bearer ${jwt.sign({ sub: 3, username: 'test-user', role: 'User' }, 'test-secret')}`,
    )
    getQuery.mockReturnValue({})

    expect(handler({} as never)).toMatchObject({
      authenticated: true,
      implementation: 'real',
      user: { id: 3, username: 'test-user', role: 'User' },
    })
  })

  it('supports mock tokens and rejects missing or invalid credentials', () => {
    useRuntimeConfig.mockReturnValue({ jwtSecret: 'test-secret' })
    const payload = Buffer.from(JSON.stringify({ sub: 4, username: 'mock-user', role: 'Admin' })).toString('base64url')
    getRequestHeader.mockReturnValue(`Bearer header.${payload}.signature`)
    getQuery.mockReturnValue({ mode: 'mock' })
    expect(handler({} as never)).toMatchObject({
      implementation: 'mock',
      user: { id: 4, username: 'mock-user', role: 'Admin' },
    })

    getRequestHeader.mockReturnValue(undefined)
    expect(() => handler({} as never)).toThrowError(expect.objectContaining({ statusCode: 401 }))

    getRequestHeader.mockReturnValue('Bearer bad-token')
    getQuery.mockReturnValue({})
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => handler({} as never)).toThrowError(expect.objectContaining({ statusCode: 401 }))
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })
})
