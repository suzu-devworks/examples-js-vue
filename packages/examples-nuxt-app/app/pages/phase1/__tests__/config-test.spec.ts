import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././config-test.vue'

describe('configuration page', () => {
  it('shows application configuration and API status', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Nuxt 4 Deep Dive Project')
    expect(wrapper.text()).toContain('Public API URL:')
    expect(wrapper.text()).toContain('Server-side API Connection Status')
  })
})
