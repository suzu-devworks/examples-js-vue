import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((/* nuxtApp */) => {
  const config = useRuntimeConfig()

  const customFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      const requestId = 'req_' + Math.random().toString(36).substring(2, 11)

      const customHeaders: Record<string, string> = {
        'x-api-key': config.public.apiKey as string,
        'x-request-id': requestId,
      }

      options.headers = {
        ...(options.headers || {}),
        ...customHeaders,
      }
    },
  })

  return {
    provide: {
      customFetch,
    },
  }
})
