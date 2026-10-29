import { describe, expect, it, vi } from 'vitest'

const { getQuery } = vi.hoisted(() => ({ getQuery: vi.fn() }))

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  getQuery,
}))

import handler from '.././hello'

describe('GET /api/phase2/hello', () => {
  it('returns a timestamp, sample items, and the requested name', () => {
    getQuery.mockReturnValue({ name: 'Vitest' })

    const result = handler({} as never)

    expect(result).toMatchObject({
      status: 'success',
      message: 'Hello from Nitro Engine!',
      clientQueryPassed: 'Vitest',
      items: expect.arrayContaining([expect.objectContaining({ id: 1 })]),
    })
    expect(new Date(result.serverTimeNormalized).toISOString()).toBe(result.serverTimeNormalized)
  })

  it('uses the fallback when the name query is missing', () => {
    getQuery.mockReturnValue({})

    expect(handler({} as never).clientQueryPassed).toContain('none')
  })
})
