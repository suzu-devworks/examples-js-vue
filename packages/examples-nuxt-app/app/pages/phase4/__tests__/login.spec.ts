import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././login.vue'

describe('login page', () => {
  it('renders the login form with prefilled demo credentials', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.get<HTMLInputElement>('input[type="text"]').element.value).toBe('admin')
    expect(wrapper.get<HTMLInputElement>('input[type="password"]').element.value).toBe('password')
    expect(wrapper.get('button[type="submit"]').text()).toBe('Login')
  })
})
