import { describe, expect, it, vi } from 'vitest'

const { createError, getQuery } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
  getQuery: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  getQuery,
}))

import handler from '.././test-error'

describe('GET /api/phase3/test-error', () => {
  it.each([
    [401, 'Unauthorized access'],
    [500, 'Database connection failed'],
  ])('returns the configured %i error', (code, message) => {
    getQuery.mockReturnValue({ code: String(code) })

    expect(() => handler({} as never)).toThrowError(
      expect.objectContaining({ statusCode: code, statusMessage: message }),
    )
  })

  it('returns success for other status codes and defaults to 500', () => {
    getQuery.mockReturnValue({ code: '200' })
    expect(handler({} as never)).toEqual({ success: true, message: 'Request succeeded without any errors!' })

    getQuery.mockReturnValue({})
    expect(() => handler({} as never)).toThrowError(expect.objectContaining({ statusCode: 500 }))
  })
})
