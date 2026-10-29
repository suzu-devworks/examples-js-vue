import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././rendering-verification.vue'

describe('rendering verification page', () => {
  it('renders the hydration and data-fetch experiments', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Verifying behavior for each rendering mode')
    expect(wrapper.text()).toContain('Hydration & Time-lag')
    expect(wrapper.text()).toContain('Data Fetching Origin')
  })
})
