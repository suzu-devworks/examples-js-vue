import { describe, expect, it, vi } from 'vitest'

const { createError } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././index.get'

describe('GET /api/phase2/users/:id', () => {
  it('returns the requested user', () => {
    expect(handler({ context: { params: { id: '1' } } } as never)).toEqual({
      id: '1',
      name: 'Alice',
      role: 'Admin',
    })
  })

  it('rejects missing and unknown user IDs', () => {
    expect(() => handler({ context: { params: {} } } as never)).toThrowError(
      expect.objectContaining({ statusCode: 400 }),
    )
    expect(() => handler({ context: { params: { id: 'missing' } } } as never)).toThrowError(
      expect.objectContaining({ statusCode: 404 }),
    )
  })
})
