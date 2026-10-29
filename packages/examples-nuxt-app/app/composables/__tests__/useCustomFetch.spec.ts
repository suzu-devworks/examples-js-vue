import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import { $fetch } from '#imports'

import { useCustomFetch } from '.././useCustomFetch'

describe('useCustomFetch', () => {
  it('adds common headers to requests', async () => {
    let requestHeaders: HeadersInit | undefined
    const fetchRequest = $fetch.create({
      onRequest({ options }) {
        requestHeaders = options.headers
      },
    })
    let result!: ReturnType<typeof useCustomFetch>
    const Harness = defineComponent({
      setup() {
        result = useCustomFetch('/test', {
          immediate: false,
          baseURL: 'http://127.0.0.1:1',
          $fetch: fetchRequest,
        })
        return () => h('span', 'ready')
      },
    })

    await mountSuspended(Harness)
    await result.execute()

    expect(new Headers(requestHeaders).get('x-api-key')).toBe('your-public-api-key')
    expect(new Headers(requestHeaders).get('x-request-id')).toMatch(/^req_[a-z0-9]{9}$/)
  })
})
