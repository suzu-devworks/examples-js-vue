import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././index.vue'

describe('home page', () => {
  it('renders the application welcome content', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.get('h1').text()).toBe('Welcome to Nuxt 4 Deep Dive')
    expect(wrapper.text()).toContain('This is the home page.')
  })
})
