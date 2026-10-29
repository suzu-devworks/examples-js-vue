import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((/* nuxtApp */) => {
  const config = useRuntimeConfig()

  const customFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      const requestId = 'req_' + Math.random().toString(36).substring(2, 11)

      options.headers.set('x-api-key', config.public.apiKey as string)
      options.headers.set('x-request-id', requestId)
    },
  })

  return {
    provide: {
      customFetch,
    },
  }
})
