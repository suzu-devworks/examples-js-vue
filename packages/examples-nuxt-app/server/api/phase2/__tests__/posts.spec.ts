import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././posts'

describe('GET /api/phase2/posts', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the post list after the intentional delay', async () => {
    vi.useFakeTimers()

    const response = handler({} as never)
    await vi.advanceTimersByTimeAsync(500)

    await expect(response).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 1, title: 'Introduction to Nuxt 4' })]),
    )
  })
})
