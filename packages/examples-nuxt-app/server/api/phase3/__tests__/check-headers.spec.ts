import { describe, expect, it, vi } from 'vitest'

const { getRequestHeaders, readBody } = vi.hoisted(() => ({
  getRequestHeaders: vi.fn(),
  readBody: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  getRequestHeaders,
  readBody,
}))

import handler from '.././check-headers'

describe('POST /api/phase3/check-headers', () => {
  it('returns the request payload and reports generated request IDs', async () => {
    getRequestHeaders.mockReturnValue({ 'x-api-key': 'test-key', 'x-request-id': 'req_123456789' })
    readBody.mockResolvedValue({ message: 'Hello' })

    await expect(handler({} as never)).resolves.toEqual({
      success: true,
      usedVersion: 'processed',
      receivedBody: { message: 'Hello' },
      receivedHeaders: { 'x-api-key': 'test-key', 'x-request-id': 'req_123456789' },
    })
  })

  it('marks requests without the expected headers as unknown', async () => {
    getRequestHeaders.mockReturnValue({})
    readBody.mockResolvedValue(null)

    await expect(handler({} as never)).resolves.toMatchObject({
      usedVersion: 'unknown',
      receivedHeaders: { 'x-api-key': null, 'x-request-id': null },
    })
  })
})
