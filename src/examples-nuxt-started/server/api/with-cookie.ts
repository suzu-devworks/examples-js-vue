// https://nuxt.com/docs/getting-started/data-fetching#pass-client-headers-to-the-api

export default defineEventHandler((event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  const value = new Date().toISOString()
  setCookie(event, "with-cookie", value)

  return { value }
})
