import { describe, expect, it, vi } from 'vitest'

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././profile'

describe('GET /api/phase4/profile', () => {
  it('returns the verified user profile', () => {
    expect(handler({ context: { auth: { sub: 7, username: 'test-user', role: 'reader' } } } as never)).toEqual({
      id: 7,
      name: 'test-user',
      email: 'test-user@example.com',
      role: 'reader',
      message: 'Successfully accessed protected profile via server middleware!',
    })
  })
})
