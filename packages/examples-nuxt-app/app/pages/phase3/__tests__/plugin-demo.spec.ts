import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././plugin-demo.vue'

describe('plugin demonstration page', () => {
  it('displays the injected app version and logger action', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Inject Initialization Logic with Nuxt Plugins')
    expect(wrapper.text()).toContain('4.0.0-learn')
    expect(wrapper.get('button').text()).toContain('Trigger Plugin Logger')
  })
})
