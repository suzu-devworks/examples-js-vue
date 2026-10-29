import { useCookie } from '#imports'

export const useAuthToken = () => {
  // Safely manage cookies named 'auth_token' with type safety and SSR/CSR commonality
  const token = useCookie<string | null>('auth_token', {
    default: () => null,
    maxAge: 60 * 60, // valid for 1 hour
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production environment
    sameSite: 'lax',
  })

  // Token settings
  const setToken = (newToken: string | null) => {
    token.value = newToken
  }

  // Delete token (e.g. when logging out)
  const clearToken = () => {
    token.value = null
  }

  return {
    token,
    setToken,
    clearToken,
  }
}
