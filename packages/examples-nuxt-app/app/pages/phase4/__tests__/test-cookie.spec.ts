import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././test-cookie.vue'

describe('cookie token page', () => {
  it('shows the saved token and token-management actions', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Manage tokens with')
    expect(wrapper.text()).toContain('Stored Token (Cookie)')
    expect(wrapper.text()).toContain('Verify Token via API')
    expect(wrapper.text()).toContain('Logout')
  })
})
