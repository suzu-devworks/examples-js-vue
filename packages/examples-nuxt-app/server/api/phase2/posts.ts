import { defineEventHandler } from 'h3'

import type { Post } from '#shared/types/posts'

export default defineEventHandler(async (): Promise<Post[]> => {
  // Intentional delay (to make it easier to see when API requests occur)
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    { id: 1, title: 'Introduction to Nuxt 4', content: 'Nuxt 4 brings amazing performance and better organization.' },
    { id: 2, title: 'Understanding Nitro Storage', content: 'Nitro storage allows simple server-side caching.' },
    {
      id: 3,
      title: 'Optimizing with useNuxtData',
      content: 'Reuse fetched data across pages to avoid redundant requests.',
    },
  ]
})
