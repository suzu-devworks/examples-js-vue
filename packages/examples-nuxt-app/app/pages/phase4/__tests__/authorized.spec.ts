import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././authorized.vue'

describe('authorized profile page', () => {
  it('renders its verification and logout flow', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('useAuthorizedFetch')
    expect(wrapper.text()).toContain('Authentication Error:')
  })
})
