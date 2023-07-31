// https://nuxt.com/docs/getting-started/data-fetching#minimize-payload-size

import { mountains } from "./data"

export default defineEventHandler((event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  return mountains
})
