import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

import { $fetch } from '#imports'

const { showError, useCookie } = vi.hoisted(() => ({
  showError: vi.fn(),
  useCookie: vi.fn(() => ({ value: 'test-token' })),
}))
mockNuxtImport('showError', () => showError)
mockNuxtImport('useCookie', () => useCookie)

import { useAuthorizedFetch } from '.././useAuthorizedFetch'

describe('useAuthorizedFetch', () => {
  it('adds auth headers and displays server errors', async () => {
    let requestHeaders: HeadersInit | undefined
    let responseErrorHandler: unknown
    const fetchRequest = $fetch.create({
      onRequest({ options }) {
        requestHeaders = options.headers
        responseErrorHandler = options.onResponseError
      },
    })
    let result!: ReturnType<typeof useAuthorizedFetch>
    const Harness = defineComponent({
      setup() {
        result = useAuthorizedFetch('/test', {
          immediate: false,
          baseURL: 'http://127.0.0.1:1',
          $fetch: fetchRequest,
        })
        return () => h('span', 'ready')
      },
    })

    await mountSuspended(Harness)
    await result.execute()

    const headers = new Headers(requestHeaders)
    expect(headers.get('Authorization')).toBe('Bearer test-token')
    expect(headers.get('x-api-key')).toBeTruthy()
    expect(headers.get('x-request-id')).toMatch(/^req_[a-z0-9]{9}$/)

    expect(responseErrorHandler).toBeTypeOf('function')
    if (typeof responseErrorHandler !== 'function') throw new Error('Expected response error handler')
    responseErrorHandler({ response: { status: 500 } as Response } as never)
    expect(showError).toHaveBeenCalledWith({
      statusCode: 500,
      statusMessage: 'A server error occurred. Please try again later.',
    })
  })
})
