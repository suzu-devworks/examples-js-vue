import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././index.vue'

describe('post list page', () => {
  it('renders the list heading and explains cached detail navigation', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Post List')
    expect(wrapper.text()).toContain('useNuxtData')
  })
})
