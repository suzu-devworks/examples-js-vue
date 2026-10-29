import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././rendering-spa.vue'

describe('SPA rendering page', () => {
  it('shows the current route and explains client-side rendering', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Rendering Verification: SPA')
    expect(wrapper.text()).toContain('constructed inside the browser')
  })
})
