import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

import { $fetch } from '#imports'

const { navigateTo } = vi.hoisted(() => ({ navigateTo: vi.fn() }))
mockNuxtImport('navigateTo', () => navigateTo)

import { useErrorHandledFetch } from '.././useErrorHandledFetch'

describe('useErrorHandledFetch', () => {
  it('handles unauthorized and server error responses consistently', async () => {
    let responseErrorHandler: unknown
    const fetchRequest = $fetch.create({
      onRequest({ options }) {
        responseErrorHandler = options.onResponseError
      },
    })
    let result!: ReturnType<typeof useErrorHandledFetch>
    const Harness = defineComponent({
      setup() {
        result = useErrorHandledFetch('/test', {
          immediate: false,
          baseURL: 'http://127.0.0.1:1',
          $fetch: fetchRequest,
        })
        return () => h('span', 'ready')
      },
    })
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    await mountSuspended(Harness)
    await result.execute()

    expect(responseErrorHandler).toBeTypeOf('function')
    if (typeof responseErrorHandler !== 'function') {
      throw new Error('Expected response error handler')
    }

    responseErrorHandler({ response: { status: 401 } as Response } as never)
    responseErrorHandler({ response: { status: 500, url: 'https://api.example.test/fail' } as Response } as never)
    expect(warn).toHaveBeenCalled()
    expect(error).toHaveBeenCalled()
    expect(navigateTo).toHaveBeenCalledWith('/login')
    warn.mockRestore()
    error.mockRestore()
  })
})
