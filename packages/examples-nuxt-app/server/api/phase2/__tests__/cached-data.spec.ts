import { afterEach, describe, expect, it, vi } from 'vitest'

const { useStorage } = vi.hoisted(() => ({ useStorage: vi.fn() }))
const storage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}

vi.mock('nitropack/runtime', () => ({ useStorage }))
vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
}))

import handler from '.././cached-data'

describe('GET /api/phase2/cached-data', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('returns cached values without generating fresh data', async () => {
    const cachedData = { value: 'cached' }
    storage.getItem.mockResolvedValue(cachedData)
    useStorage.mockReturnValue(storage)

    await expect(handler({} as never)).resolves.toMatchObject({
      source: 'cache',
      data: cachedData,
    })
    expect(storage.getItem).toHaveBeenCalledWith('heavy-data-cache')
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('generates and stores data after a cache miss', async () => {
    vi.useFakeTimers()
    storage.getItem.mockResolvedValue(null)
    useStorage.mockReturnValue(storage)

    const response = handler({} as never)
    await vi.advanceTimersByTimeAsync(2000)
    const result = await response

    expect(result.source).toBe('server')
    expect(result.data).toMatchObject({ value: 'This is expensive data generated on the server.' })
    expect(storage.setItem).toHaveBeenCalledWith('heavy-data-cache', result.data)
  })
})
