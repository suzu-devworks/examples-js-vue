import { mountSuspended, registerEndpoint, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const { clearCache, useFetchMock } = vi.hoisted(() => ({
  clearCache: vi.fn(),
  useFetchMock: vi.fn(),
}))
mockNuxtImport('useFetch', () => useFetchMock)
registerEndpoint('/api/phase2/clear-cache', () => clearCache())

import Page from '.././nitro-storage.vue'

describe('Nitro storage page', () => {
  beforeEach(() => {
    clearCache.mockReset().mockResolvedValue({ message: 'Cache cleared' })
    useFetchMock.mockReset().mockResolvedValue({
      data: ref(null),
      pending: ref(false),
      refresh: vi.fn(),
    })
  })

  it('fetches again and displays the cache-cleared message', async () => {
    const refresh = vi.fn()
    useFetchMock.mockResolvedValue({
      data: ref(null),
      pending: ref(false),
      refresh,
    })
    const wrapper = await mountSuspended(Page)

    await wrapper.get('button').trigger('click')
    expect(refresh).toHaveBeenCalledOnce()

    await wrapper.get('button.secondary').trigger('click')
    expect(clearCache).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(wrapper.text()).toContain('Cache cleared'))
  })

  it.each([
    { source: 'cache', badgeClass: 'badge-cache' },
    { source: 'server', badgeClass: 'badge-server' },
  ])('renders the $source response with its matching badge', async ({ source, badgeClass }) => {
    useFetchMock.mockResolvedValue({
      data: ref({ source, message: 'Data loaded', fetchedAt: '2026-10-29T00:00:00.000Z' }),
      pending: ref(false),
      refresh: vi.fn(),
    })

    const wrapper = await mountSuspended(Page)

    expect(wrapper.get(`.${badgeClass}`).text()).toBe(source)
    expect(wrapper.text()).toContain('Data loaded')
    expect(wrapper.text()).toContain('2026-10-29T00:00:00.000Z')
  })
})
