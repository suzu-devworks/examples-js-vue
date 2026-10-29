import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././dashboard.vue'

describe('protected dashboard page', () => {
  it('declares the auth middleware and renders the protected dashboard', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Protected Dashboard')
    expect(wrapper.text()).toContain('Failed to load profile data.')
  })
})
