import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const { clearToken, navigateTo, useAuthorizedFetch, useRoute } = vi.hoisted(() => ({
  clearToken: vi.fn(),
  navigateTo: vi.fn(),
  useAuthorizedFetch: vi.fn(),
  useRoute: vi.fn(() => ({ fullPath: '/phase4/authorized?tab=profile' })),
}))
mockNuxtImport('navigateTo', () => navigateTo)
mockNuxtImport('useAuthorizedFetch', () => useAuthorizedFetch)
mockNuxtImport('useAuthToken', () => vi.fn(() => ({ clearToken })))
mockNuxtImport('useRoute', () => useRoute)

import Page from '.././authorized.vue'

describe('authorized profile page', () => {
  beforeEach(() => {
    clearToken.mockReset()
    navigateTo.mockReset()
    useAuthorizedFetch.mockReset()
  })

  it('shows the session-verification state while the request is pending', async () => {
    useAuthorizedFetch.mockResolvedValue({
      data: ref(null),
      pending: ref(true),
      error: ref(null),
    })

    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Verifying session...')
  })

  it.each([
    { data: 'Session expired', message: 'Unauthorized', shownMessage: 'Session expired' },
    { data: null, message: 'Network error', shownMessage: 'Network error' },
  ])('shows the error fallback message "$shownMessage"', async ({ data, message, shownMessage }) => {
    useAuthorizedFetch.mockResolvedValue({
      data: ref(null),
      pending: ref(false),
      error: ref({ data, message }),
    })

    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain(`Authentication Error: ${shownMessage}`)
  })

  it('shows the authorized profile and logs out to the login page', async () => {
    useAuthorizedFetch.mockResolvedValue({
      data: ref({
        authenticated: true,
        message: 'Session verified',
        user: { id: 1, username: 'test-user', role: 'Admin' },
      }),
      pending: ref(false),
      error: ref(null),
    })

    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Authorized Access Successful')
    expect(wrapper.text()).toContain('Session verified')
    expect(wrapper.text()).toContain('test-user')

    await wrapper.get('button').trigger('click')

    expect(clearToken).toHaveBeenCalledOnce()
    expect(navigateTo).toHaveBeenCalledWith({
      path: '/phase4/login',
      query: { redirect: '/phase4/authorized?tab=profile' },
    })
  })
})
