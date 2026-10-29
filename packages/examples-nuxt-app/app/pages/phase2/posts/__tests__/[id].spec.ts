import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const { useNuxtData } = vi.hoisted(() => ({
  useNuxtData: vi.fn(),
}))
mockNuxtImport('useNuxtData', () => useNuxtData)

import Page from '.././[id].vue'

describe('post detail page', () => {
  beforeEach(() => {
    useNuxtData.mockReturnValue({ data: ref(undefined) })
  })

  it('shows the post when it is returned from the useNuxtData cache', async () => {
    useNuxtData.mockReturnValue({
      data: ref([{ id: 1, title: 'Cached post', content: 'Cached post content' }]),
    })

    const wrapper = await mountSuspended(Page, { route: '/phase2/posts/1' })

    expect(wrapper.text()).toContain('Cached post')
    expect(wrapper.text()).toContain('Cached post content')
    expect(wrapper.text()).toContain('Loaded from useNuxtData cache')
  })

  it('shows a fallback when the requested post is not cached', async () => {
    const wrapper = await mountSuspended(Page, { route: '/phase2/posts/999' })

    expect(wrapper.text()).toContain('Post Detail')
    expect(wrapper.text()).toContain('Post not found.')
    expect(wrapper.get('a[href="/phase2/posts"]').text()).toContain('Back to List')
  })
})
