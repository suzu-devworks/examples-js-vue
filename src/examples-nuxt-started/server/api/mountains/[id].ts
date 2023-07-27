// https://nuxt.com/docs/getting-started/data-fetching#minimize-payload-size

import { mountains } from "./data"

export default defineEventHandler((event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method} id=${event.context.params?.id}`)

  const id = event.context.params?.id
  const mountain = mountains.find((x) => x.title === id)
  if (!mountain) {
    return createError({
      statusCode: 404,
      message: "Not Found.",
    })
  }

  return mountain
})
