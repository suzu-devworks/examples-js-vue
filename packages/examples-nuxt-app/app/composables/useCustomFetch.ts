import type { UseFetchOptions } from 'nuxt/app'

import { createUseFetch, useRuntimeConfig } from '#imports'

export const useCustomFetch = createUseFetch(<T>(callerOptions: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()

  const requestId = 'req_' + Math.random().toString(36).substring(2, 11)

  return {
    // Set a common base URL and default options
    baseURL: config.public.apiBaseUrl,
    headers: {
      'x-api-key': config.public.apiKey,
      'x-request-id': requestId,
      ...(callerOptions.headers || {}),
    },
  }
})
