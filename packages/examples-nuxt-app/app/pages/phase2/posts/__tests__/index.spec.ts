import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const posts = [
  { id: 1, title: 'Post 1', content: 'Post content 1' },
  { id: 2, title: 'Post 2', content: 'Post content 2' },
  { id: 3, title: 'Post 3', content: 'Post content 3' },
]

const { useFetch } = vi.hoisted(() => ({
  useFetch: vi.fn(),
}))
mockNuxtImport('useFetch', () => useFetch)

import Page from '.././index.vue'

describe('post list page', () => {
  beforeEach(() => {
    useFetch.mockResolvedValue({
      data: ref(posts),
      pending: ref(false),
      error: ref(undefined),
    })
  })

  it('renders the list heading and explains cached detail navigation', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Post List')
    expect(wrapper.text()).toContain('useNuxtData')
  })

  it('creates one detail link for each post fetched with useFetch', async () => {
    const wrapper = await mountSuspended(Page)
    const postLinks = wrapper.findAll('a[href^="/phase2/posts/"]')

    expect(postLinks).toHaveLength(posts.length)
  })
})
