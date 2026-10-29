import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import Page from '.././use-state.vue'

describe('shared state page', () => {
  it('increments, decrements, and resets the shared counter', async () => {
    const wrapper = await mountSuspended(Page)
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)

    expect(wrapper.text()).toContain('Count: 0')
    await buttons[0]!.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Count: 1')

    await buttons[1]!.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Count: 0')

    await buttons[2]!.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Count: 0')
  })
})
