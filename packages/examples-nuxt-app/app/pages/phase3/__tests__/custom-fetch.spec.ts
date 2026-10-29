import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././custom-fetch.vue'

describe('custom fetch page', () => {
  it('renders both request customization options and the payload field', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Compare Fetch Customization Versions')
    expect(wrapper.html()).toContain('value="composable"')
    expect(wrapper.html()).toContain('value="plugin"')
    expect(wrapper.html()).toContain('placeholder="Type a message..."')
  })
})
