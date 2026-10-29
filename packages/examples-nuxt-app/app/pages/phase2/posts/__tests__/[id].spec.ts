import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././[id].vue'

describe('post detail page', () => {
  it('shows a fallback when the requested post is not cached', async () => {
    const wrapper = await mountSuspended(Page, { route: '/phase2/posts/999' })

    expect(wrapper.text()).toContain('Post Detail')
    expect(wrapper.text()).toContain('Post not found.')
    expect(wrapper.get('a[href="/phase2/posts"]').text()).toContain('Back to List')
  })
})
