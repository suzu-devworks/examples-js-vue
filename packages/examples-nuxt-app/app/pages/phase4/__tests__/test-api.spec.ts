import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././test-api.vue'

describe('authentication API guide', () => {
  it('renders the login and verification examples', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Implement login and token management')
    expect(wrapper.text()).toContain('curl -X POST')
    expect(wrapper.text()).toContain('Authorization:')
  })
})
