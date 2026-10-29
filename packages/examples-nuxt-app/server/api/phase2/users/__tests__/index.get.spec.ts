import { describe, expect, it, vi } from 'vitest'

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././index.get'

describe('GET /api/phase2/users', () => {
  it('returns the seeded user list', () => {
    expect(handler({ url: new URL('http://localhost/api/phase2/users') } as never)).toEqual([
      { id: '1', name: 'Alice', role: 'Admin' },
      { id: '2', name: 'Bob', role: 'Developer' },
    ])
  })
})
