import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { useAuthToken } from '.././useAuthToken'

describe('useAuthToken', () => {
  it('sets and clears the SSR-compatible auth cookie', async () => {
    let authToken!: ReturnType<typeof useAuthToken>
    const Harness = defineComponent({
      setup() {
        authToken = useAuthToken()
        return () => h('span', authToken.token.value ?? 'empty')
      },
    })

    const wrapper = await mountSuspended(Harness)
    expect(wrapper.text()).toBe('empty')

    authToken.setToken('test-token')
    await nextTick()
    expect(wrapper.text()).toBe('test-token')

    authToken.clearToken()
    await nextTick()
    expect(wrapper.text()).toBe('empty')
  })
})
