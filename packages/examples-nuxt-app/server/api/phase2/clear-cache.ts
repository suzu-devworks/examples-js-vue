import { useStorage } from 'nitropack/runtime'
import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler(async () => {
  const storage = useStorage('cache')

  // Clear cache.
  await storage.removeItem('heavy-data-cache')

  return {
    success: true,
    message: 'Nitro storage cache cleared.',
  }
})
