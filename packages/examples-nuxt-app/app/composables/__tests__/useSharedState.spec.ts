import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import { useSharedState } from '.././useSharedState'

describe('useSharedState', () => {
  it('initializes a fresh count and a timestamp', async () => {
    let state!: ReturnType<typeof useSharedState>
    const Harness = defineComponent({
      setup() {
        state = useSharedState()
        return () => h('span', `${state.value.count}:${state.value.lastUpdated}`)
      },
    })

    const wrapper = await mountSuspended(Harness)

    expect(state.value.count).toBe(0)
    expect(state.value.lastUpdated).not.toBe('')

    state.value.count = 2
    expect(wrapper.text()).toContain('2:')
  })
})
