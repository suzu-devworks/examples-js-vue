import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././nitro-storage.vue'

describe('Nitro storage page', () => {
  it('provides fetch and clear-cache controls', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Nitro Storage API Caching')
    expect(wrapper.get('button').text()).toBe('Fetch Data')
    expect(wrapper.text()).toContain('Clear Server Cache')
  })
})
