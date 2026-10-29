import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '.././error-handling.vue'

describe('error handling page', () => {
  it('offers the supported API response codes', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Consistent Error Handling')
    expect(wrapper.get('select').text()).toContain('401 Unauthorized')
    expect(wrapper.get('select').text()).toContain('500 Internal Server Error')
    expect(wrapper.get('button').text()).toContain('Send Request')
  })
})
