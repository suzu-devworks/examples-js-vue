import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler((event) => {
  // To make it easier to feel whether the server is actually running when accessing directly from the browser,
  // Allows to receive the server time at the time of the request and simple query parameters.
  const query = getQuery(event)
  const timestamp = new Date().toISOString()

  return {
    status: 'success',
    message: 'Hello from Nitro Engine!',
    serverTimeNormalized: timestamp,
    clientQueryPassed: query.name || 'none (You can pass ?name=xxx in URL)',
    items: [
      { id: 1, name: 'Understanding Nuxt 3 Architecture' },
      { id: 2, name: 'Exploiting the Nitro server engine' },
      { id: 3, name: 'Custom useFetch implementation' },
    ],
  }
})
