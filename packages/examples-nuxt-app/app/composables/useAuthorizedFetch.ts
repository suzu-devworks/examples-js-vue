import type { UseFetchOptions } from '#app'
import { createUseFetch, navigateTo, showError, useCookie, useRuntimeConfig } from '#imports'

/**
 * Custom useFetch to automatically grant common headers,
 * error handling, and Bearer authentication tokens
 */
export const useAuthorizedFetch = createUseFetch(<T>(callerOptions: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()
  const requestId = 'req_' + Math.random().toString(36).substring(2, 11)

  // 1. Obtain access token from cookie (SSR/CSR compatible)
  const accessToken = useCookie<string | null>('auth_token')

  // 2. Construct Authorization header if token is present
  const authorizationHeader: Record<string, string> = accessToken.value
    ? { Authorization: `Bearer ${accessToken.value}` }
    : {}

  return {
    baseURL: config.public.apiBaseUrl,

    // 3. Integrate Bearer token in common header
    headers: {
      'x-api-key': config.apiSecretKey,
      'x-request-id': requestId,
      ...authorizationHeader,
      ...(callerOptions.headers || {}),
    },

    // 4. Uniform handling of 401 and 500 errors
    onResponseError({ response }: { response: Response }) {
      const status = response.status

      if (status === 401) {
        console.warn('[API Error 401] Token expired or unauthorized. Redirecting to login...')
        if (import.meta.client) {
          accessToken.value = null // destroy token
          const fullPath = window.location.pathname + window.location.search
          navigateTo(`/phase4/login?redirect=${encodeURIComponent(fullPath)}`)
        }
      } else if (status === 500) {
        showError({
          statusCode: 500,
          statusMessage: 'A server error occurred. Please try again later.',
        })
      }
    },
  }
})
