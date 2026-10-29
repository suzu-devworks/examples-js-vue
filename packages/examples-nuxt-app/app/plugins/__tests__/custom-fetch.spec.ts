import { createServer } from 'node:http'

import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import { useNuxtApp } from '#imports'

describe('custom fetch plugin', () => {
  it('injects a client that adds configured headers and preserves caller headers', async () => {
    const requestHeaders: Array<Record<string, string | string[] | undefined>> = []
    const server = createServer((request, response) => {
      requestHeaders.push(request.headers)
      response.writeHead(200, { 'content-type': 'application/json' })
      response.end('{}')
    })
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject)
      server.listen(0, '127.0.0.1', resolve)
    })

    try {
      const address = server.address()
      if (!address || typeof address === 'string') {
        throw new Error('Test server did not bind to a TCP port')
      }

      let customFetch!: ReturnType<typeof useNuxtApp>['$customFetch']
      const Harness = defineComponent({
        setup() {
          customFetch = useNuxtApp().$customFetch
          return () => h('span', 'ready')
        },
      })

      await mountSuspended(Harness)

      expect(customFetch).toBeTypeOf('function')
      const fetchWithTestBase = customFetch.create({ baseURL: `http://127.0.0.1:${address.port}` })
      await fetchWithTestBase('/test', {
        headers: { 'x-api-key': 'caller-key', 'x-existing-header': 'preserved' },
      })
      await fetchWithTestBase('/test')

      expect(requestHeaders).toHaveLength(2)
      expect(requestHeaders[0]?.['x-api-key']).toBe('your-public-api-key')
      expect(requestHeaders[0]?.['x-existing-header']).toBe('preserved')
      expect(requestHeaders[0]?.['x-request-id']).toMatch(/^req_[a-z0-9]{9}$/)
      expect(requestHeaders[1]?.['x-api-key']).toBe('your-public-api-key')
      expect(requestHeaders[1]?.['x-request-id']).toMatch(/^req_[a-z0-9]{9}$/)
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()))
      })
    }
  })
})
