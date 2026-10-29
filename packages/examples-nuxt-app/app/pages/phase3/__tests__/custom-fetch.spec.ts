import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const { useCustomFetch } = vi.hoisted(() => ({
  useCustomFetch: vi.fn(),
}))
mockNuxtImport('useCustomFetch', () => useCustomFetch)

import Page from '.././custom-fetch.vue'

describe('custom fetch page', () => {
  it('renders both request customization options and the payload field', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Compare Fetch Customization Versions')
    expect(wrapper.html()).toContain('value="composable"')
    expect(wrapper.html()).toContain('value="plugin"')
    expect(wrapper.html()).toContain('placeholder="Type a message..."')
  })

  it('shows the custom fetch result after the form is submitted', async () => {
    useCustomFetch.mockResolvedValue({
      data: ref({
        success: true,
        usedVersion: 'composable',
        receivedBody: { message: 'Hello Nuxt 4 Custom Fetch!' },
        receivedHeaders: { 'x-api-key': 'test-api-key', 'x-request-id': 'req_test12345' },
      }),
      error: ref(undefined),
    })
    const wrapper = await mountSuspended(Page)

    await wrapper.get('form').trigger('submit')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Server Response & Verification'))

    expect(useCustomFetch).toHaveBeenCalledWith(
      '/api/phase3/check-headers',
      expect.objectContaining({ method: 'POST', body: { message: 'Hello Nuxt 4 Custom Fetch!' } }),
    )
    expect(wrapper.text()).toContain('Hello Nuxt 4 Custom Fetch!')
    expect(wrapper.text()).toContain('test-api-key')
    expect(wrapper.text()).toContain('req_test12345')
  })
})
