import { describe, expect, it, vi } from 'vitest'

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././check'

describe('GET /api/phase1/check', () => {
  it('reports the runtime environment and a server timestamp', () => {
    const result = handler({ url: new URL('http://localhost/api/phase1/check') } as never)

    expect(result).toMatchObject({
      env: process.env.NODE_ENV || 'development',
      message: 'Hello from Nitro Server Engine!',
    })
    expect(new Date(result.calledAt).toISOString()).toBe(result.calledAt)
  })
})
