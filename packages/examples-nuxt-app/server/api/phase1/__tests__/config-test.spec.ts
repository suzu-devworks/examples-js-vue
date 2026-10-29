import { describe, expect, it, vi } from 'vitest'

const { useRuntimeConfig } = vi.hoisted(() => ({ useRuntimeConfig: vi.fn() }))

vi.mock('nuxt/server', () => ({
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  useRuntimeConfig,
}))

import handler from '.././config-test'

describe('GET /api/phase1/config-test', () => {
  it('returns the public URL and masks the private key', () => {
    useRuntimeConfig.mockReturnValue({
      apiSecretKey: 'private-test-key',
      public: { apiBaseUrl: 'https://api.example.test' },
    })

    expect(handler({} as never)).toEqual({
      message: 'The private key can be read from the server (Nitro) side',
      publicUrl: 'https://api.example.test',
      secretKeyExposed: '*********',
    })
  })

  it('returns null for the masked key when no server key is configured', () => {
    useRuntimeConfig.mockReturnValue({ apiSecretKey: '', public: { apiBaseUrl: 'https://api.example.test' } })

    expect(handler({} as never).secretKeyExposed).toBeNull()
  })
})
