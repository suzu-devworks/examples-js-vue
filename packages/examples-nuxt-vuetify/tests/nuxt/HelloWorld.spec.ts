import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import HelloWorld from '../../app/components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('displays the Components link', async () => {
    const wrapper = await mountSuspended(HelloWorld)

    expect(wrapper.text()).toContain('Components')
  })
})
