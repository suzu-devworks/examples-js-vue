// https://nuxt.com/docs/getting-started/data-fetching#client-only-fetching

export default defineEventHandler(async (event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  await sleep(1500)

  return `Comment at ${new Date().toISOString()}`
})
