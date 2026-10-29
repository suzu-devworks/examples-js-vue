import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././rendering-ssr.vue'

describe('SSR rendering page', () => {
  it('shows the current route and explains server-side rendering', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Rendering Verification: SSR')
    expect(wrapper.text()).toContain('assembled into HTML on the server-side')
  })
})
