import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { createError } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const { navigateTo, useAuthToken, clearToken, verify } = vi.hoisted(() => ({
  navigateTo: vi.fn(),
  useAuthToken: vi.fn(),
  clearToken: vi.fn(),
  verify: vi.fn(),
}))
mockNuxtImport('navigateTo', () => navigateTo)
mockNuxtImport('useAuthToken', () => useAuthToken)

registerEndpoint('/api/phase4/verify', verify)

import Page from '.././test-cookie.vue'

const findButton = (wrapper: VueWrapper, label: string) =>
  wrapper.findAll<HTMLButtonElement>('button').find((button) => button.text() === label)!

describe('cookie token page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthToken.mockReturnValue({ token: ref('test-token'), clearToken })
    verify.mockReturnValue({ valid: true, user: { username: 'tester' } })
  })

  it('shows the saved token and token-management actions', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Manage tokens with')
    expect(wrapper.text()).toContain('Stored Token (Cookie)')
    expect(wrapper.text()).toContain('Verify Token via API')
    expect(wrapper.text()).toContain('Logout')
  })

  it('shows the verification result after Verify Token via API is clicked', async () => {
    const wrapper = await mountSuspended(Page)

    await findButton(wrapper, 'Verify Token via API').trigger('click')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Verification Result:'))

    expect(verify).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toContain('"valid": true')
    expect(wrapper.text()).toContain('"username": "tester"')
  })

  it('shows the error response when verification fails', async () => {
    verify.mockImplementation(() => {
      throw createError({ statusCode: 401, data: { error: 'Invalid token' } })
    })
    const wrapper = await mountSuspended(Page)

    await findButton(wrapper, 'Verify Token via API').trigger('click')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Verification Result:'))

    expect(wrapper.text()).toContain('Invalid token')
  })

  it('clears the token and navigates to login after Logout is clicked', async () => {
    const wrapper = await mountSuspended(Page)

    await findButton(wrapper, 'Verify Token via API').trigger('click')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Verification Result:'))
    await findButton(wrapper, 'Logout').trigger('click')

    expect(clearToken).toHaveBeenCalledTimes(1)
    expect(navigateTo).toHaveBeenCalledWith({ path: '/phase4/login', query: { redirect: expect.any(String) } })
    expect(wrapper.text()).not.toContain('Verification Result:')
  })
})
