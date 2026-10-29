import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import { useNuxtApp } from '#imports'

describe('custom fetch plugin', () => {
  it('injects a reusable API fetch client', async () => {
    let customFetch!: ReturnType<typeof useNuxtApp>['$customFetch']
    const Harness = defineComponent({
      setup() {
        customFetch = useNuxtApp().$customFetch
        return () => h('span', 'ready')
      },
    })

    await mountSuspended(Harness)

    expect(customFetch).toBeTypeOf('function')
  })
})
