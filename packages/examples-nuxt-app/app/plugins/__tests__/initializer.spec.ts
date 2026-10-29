import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

import { useNuxtApp } from '#imports'

describe('initializer plugin', () => {
  it('provides the application version and logger', async () => {
    let app!: ReturnType<typeof useNuxtApp>
    const Harness = defineComponent({
      setup() {
        app = useNuxtApp()
        return () => h('span', app.$appVersion)
      },
    })
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    const wrapper = await mountSuspended(Harness)

    expect(wrapper.text()).toBe('4.0.0-learn')
    expect(app.$logMessage).toBeTypeOf('function')
    app.$logMessage('test message')
    expect(log).toHaveBeenCalledWith(expect.stringContaining('test message'))
    log.mockRestore()
  })
})
