// https://nuxt.com/docs/getting-started/data-fetching#lazy

import { PostData } from "@/types"

export default defineEventHandler(async (event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  const postedTime = new Date().toISOString()

  const posts: PostData[] = []
  for (let i = 0; i < 5; i++) {
    posts.push({
      id: i,
      postedTime,
      message: `message number is ${i}`,
    })
  }

  await sleep(2000)

  return posts
})
