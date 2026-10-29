import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '.././app.vue'

describe('application shell', () => {
  it('renders the project agenda and the active page outlet', async () => {
    const wrapper = await mountSuspended(App)

    expect(wrapper.get('.brand-link').text()).toContain('Nuxt 4 Deep Dive')
    expect(wrapper.get('.dropdown summary').text()).toBe('Project Agenda')
    expect(wrapper.text()).toContain('Phase 1: Configuration and rendering fundamentals')
    expect(wrapper.findComponent({ name: 'NuxtPage' }).exists()).toBe(true)
  })
})
