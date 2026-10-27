import { navigateTo, useRuntimeConfig } from 'nuxt/app'

import { createUseFetch } from '#app/composables/fetch'

export const useErrorHandledFetch = createUseFetch((/* callerOptions */) => {
  const config = useRuntimeConfig()

  return {
    baseURL: config.public.apiBaseUrl,
    // I thought it was running twice in an unnatural way, but it turned out to be a helpful feature.
    // https://github.com/unjs/ofetch#%EF%B8%8F-auto-retry
    // retry: 0,
    onResponseError({ response }) {
      const status = response.status

      if (status === 401) {
        console.warn('[API Error 401] Unauthorized. Redirecting to login...')
        if (import.meta.client) {
          navigateTo('/login')
        }
      } else if (status === 500) {
        console.error(`[API Error 500] Server error occurred at URL: ${response.url}`)
      } else {
        console.error(`[API Error ${status}]`, response._data)
      }
    },
  }
})
