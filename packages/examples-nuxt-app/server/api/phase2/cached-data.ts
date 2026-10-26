import { defineEventHandler } from 'h3'
import { useStorage } from 'nitropack/runtime'

export default defineEventHandler(async (/*event*/) => {
  const storage = useStorage('cache') // Utilizes Nitro's cache storage layer
  const cacheKey = 'heavy-data-cache'

  // Attempt to retrieve data from cache
  const cachedData = await storage.getItem(cacheKey)

  if (cachedData) {
    return {
      source: 'cache',
      message: 'Data retrieved from Nitro Storage (Cache Hit)!',
      data: cachedData,
      fetchedAt: new Date().toISOString(),
    }
  }

  // Heavy processing assuming no cache (e.g. external API calls or calculations that take 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const freshData = {
    value: 'This is expensive data generated on the server.',
    generatedAt: new Date().toISOString(),
  }

  // Save cache in storage (e.g. You can set an expiration date, but save it simply first)
  await storage.setItem(cacheKey, freshData)

  return {
    source: 'server',
    message: 'Data freshly generated on the server (Cache Miss).',
    data: freshData,
    fetchedAt: new Date().toISOString(),
  }
})
