// https://nuxt.com/docs/getting-started/data-fetching#pass-client-headers-to-the-api

export default defineEventHandler((event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  let counter = parseInt(getCookie(event, "counter") || "0")
  // eslint-disable-next-line no-console
  console.log("cookie is", counter)
  setCookie(event, "counter", `${++counter}`)

  return { counter }
})
