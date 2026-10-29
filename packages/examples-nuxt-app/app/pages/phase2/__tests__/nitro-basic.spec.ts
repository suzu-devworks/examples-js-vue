import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././nitro-basic.vue'

describe('Nitro API basics page', () => {
  it('explains direct endpoint access and useFetch consumption', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Nitro Server API Basics')
    expect(wrapper.get('a[href="/api/phase2/hello"]').text()).toContain('Open Raw API Output')
    expect(wrapper.text()).toContain('Internal Hydration via useFetch')
  })
})
