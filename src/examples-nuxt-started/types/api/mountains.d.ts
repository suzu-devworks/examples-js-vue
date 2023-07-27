// https://nuxt.com/docs/getting-started/data-fetching#minimize-payload-size

/**
 * Interface for /api/mountains.
 */
export interface Mountain {
  id: number
  title: string
  description?: string
  location?: string
  elevation?: number
}
