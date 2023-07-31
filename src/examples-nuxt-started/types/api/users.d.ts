// https://nuxt.com/docs/getting-started/data-fetching

/**
 * Interface for /api/users.
 */
export interface User {
  id: number
  name: string
  dateOfBirth?: string
  lastUpdatedAt?: string
}
