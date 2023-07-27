// https://nuxt.com/docs/getting-started/data-fetching#lazy

/**
 * Interface for /api/posts.
 */
export interface PostData {
  id: number
  postedTime: string
  message?: string
}
