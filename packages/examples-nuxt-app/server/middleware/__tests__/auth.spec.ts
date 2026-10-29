import jwt from 'jsonwebtoken'
import { describe, expect, it, vi } from 'vitest'

const { createError, getRequestHeader, getRequestURL, useRuntimeConfig } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
  getRequestHeader: vi.fn(),
  getRequestURL: vi.fn(),
  useRuntimeConfig: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  getRequestHeader,
  getRequestURL,
  useRuntimeConfig,
}))

import handler from '.././auth'

describe('server authentication middleware', () => {
  it('skips public login endpoints', () => {
    getRequestURL.mockReturnValue(new URL('http://localhost/api/phase4/login'))

    expect(handler({} as never)).toBeUndefined()
    expect(getRequestHeader).not.toHaveBeenCalled()
  })

  it('rejects missing and malformed bearer tokens', () => {
    getRequestURL.mockReturnValue(new URL('http://localhost/api/phase4/profile'))
    getRequestHeader.mockReturnValue(undefined)
    expect(() => handler({} as never)).toThrowError(expect.objectContaining({ statusCode: 401 }))

    getRequestHeader.mockReturnValue('Basic token')
    expect(() => handler({} as never)).toThrowError(expect.objectContaining({ statusCode: 401 }))
  })

  it('verifies a token and attaches its payload to the request context', () => {
    const secret = 'middleware-test-secret'
    const event = { context: {} }
    getRequestURL.mockReturnValue(new URL('http://localhost/api/phase4/profile'))
    getRequestHeader.mockReturnValue(`Bearer ${jwt.sign({ sub: 5, username: 'test-user' }, secret)}`)
    useRuntimeConfig.mockReturnValue({ jwtSecret: secret })

    handler(event as never)

    expect(event.context).toMatchObject({ auth: { sub: 5, username: 'test-user' } })
  })

  it('rejects invalid tokens', () => {
    getRequestURL.mockReturnValue(new URL('http://localhost/api/phase4/profile'))
    getRequestHeader.mockReturnValue('Bearer invalid')
    useRuntimeConfig.mockReturnValue({ jwtSecret: 'middleware-test-secret' })
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => handler({ context: {} } as never)).toThrowError(expect.objectContaining({ statusCode: 401 }))
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })
})
