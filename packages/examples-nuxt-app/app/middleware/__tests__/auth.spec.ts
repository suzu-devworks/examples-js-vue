import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

const { navigateTo } = vi.hoisted(() => ({
  navigateTo: vi.fn((location: unknown) => location),
}))
mockNuxtImport('navigateTo', () => navigateTo)

import authMiddleware from '.././auth'

describe('auth route middleware', () => {
  it('redirects an unauthenticated route to login with its original path', async () => {
    let navigation: unknown
    const Harness = defineComponent({
      setup() {
        navigation = authMiddleware({ fullPath: '/phase4/dashboard?tab=profile' } as never, { fullPath: '/' } as never)
        return () => h('span', 'middleware invoked')
      },
    })

    await mountSuspended(Harness)

    expect(navigateTo).toHaveBeenCalledWith({
      path: '/phase4/login',
      query: { redirect: '/phase4/dashboard?tab=profile' },
    })
    expect(navigation).toEqual({
      path: '/phase4/login',
      query: { redirect: '/phase4/dashboard?tab=profile' },
    })
  })
})
