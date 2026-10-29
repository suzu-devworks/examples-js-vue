import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././users.vue'

describe('user management page', () => {
  it('renders the user table and create form', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Practicing Nitro REST API(CRUD)')
    expect(wrapper.get('label[for="username"]').text()).toContain('User Name')
    expect(wrapper.get('label[for="user_role"]').text()).toContain('Role')
    expect(wrapper.text()).toContain('Raw API Response Console')
  })
})
