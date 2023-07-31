// https://nuxt.com/docs/getting-started/data-fetching#usefetch

let counter = 0

export default defineEventHandler((event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  return ++counter
})
