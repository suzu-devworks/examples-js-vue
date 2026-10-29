import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { createError, readBody } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { navigateTo, useAuthToken, setToken, login } = vi.hoisted(() => ({
  navigateTo: vi.fn(),
  useAuthToken: vi.fn(),
  setToken: vi.fn(),
  login: vi.fn(),
}))
mockNuxtImport('navigateTo', () => navigateTo)
mockNuxtImport('useAuthToken', () => useAuthToken)

registerEndpoint('/api/phase4/login', { method: 'POST', handler: login })

import Page from '.././login.vue'

describe('login page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthToken.mockReturnValue({ setToken })
    login.mockImplementation(() => ({ success: true, token: 'issued-token' }))
  })

  it('renders the login form with prefilled demo credentials', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.get<HTMLInputElement>('input[type="text"]').element.value).toBe('admin')
    expect(wrapper.get<HTMLInputElement>('input[type="password"]').element.value).toBe('password')
    expect(wrapper.get('button[type="submit"]').text()).toBe('Login')
  })

  it('stores the token and navigates to the dashboard after Login is clicked', async () => {
    login.mockImplementation(async (event) => {
      expect(await readBody(event)).toEqual({ username: 'admin', password: 'password' })
      return { success: true, token: 'issued-token' }
    })
    const wrapper = await mountSuspended(Page)

    await wrapper.get('button[type="submit"]').trigger('submit')
    await vi.waitFor(() => expect(navigateTo).toHaveBeenCalled())

    expect(login).toHaveBeenCalledTimes(1)
    expect(setToken).toHaveBeenCalledWith('issued-token')
    expect(navigateTo).toHaveBeenCalledWith('/phase4/dashboard')
  })

  it('navigates to the redirect query path after login', async () => {
    const wrapper = await mountSuspended(Page, { route: '/phase4/login?redirect=/phase4/test-cookie' })

    await wrapper.get('form').trigger('submit')
    await vi.waitFor(() => expect(navigateTo).toHaveBeenCalled())

    expect(navigateTo).toHaveBeenCalledWith('/phase4/test-cookie')
  })

  it('shows an error and keeps the user on the page when login fails', async () => {
    login.mockImplementation(() => {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    })
    const wrapper = await mountSuspended(Page)

    await wrapper.get('form').trigger('submit')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Invalid credentials'))

    expect(setToken).not.toHaveBeenCalled()
    expect(navigateTo).not.toHaveBeenCalled()
  })
})
