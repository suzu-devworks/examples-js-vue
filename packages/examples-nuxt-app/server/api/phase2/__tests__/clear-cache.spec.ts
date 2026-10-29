import { describe, expect, it, vi } from 'vitest'

const { useStorage } = vi.hoisted(() => ({ useStorage: vi.fn() }))
const removeItem = vi.fn()

vi.mock('nitropack/runtime', () => ({ useStorage }))
vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././clear-cache'

describe('GET /api/phase2/clear-cache', () => {
  it('removes the cached value and confirms the operation', async () => {
    useStorage.mockReturnValue({ removeItem })

    await expect(handler({} as never)).resolves.toEqual({
      success: true,
      message: 'Nitro storage cache cleared.',
    })
    expect(removeItem).toHaveBeenCalledWith('heavy-data-cache')
  })
})
