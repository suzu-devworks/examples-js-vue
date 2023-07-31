// https://nuxt.com/docs/getting-started/data-fetching#lazy

import { User } from "@/types"

export default defineEventHandler((event) => {
  const req = event.node.req
  // eslint-disable-next-line no-console
  console.log(`request handler ${req.url} ${req.method}`)

  const lastUpdatedAt = new Date().toISOString()

  const users: User[] = [
    {
      id: 100,
      name: "Alice",
      dateOfBirth: "2000-01-10",
      lastUpdatedAt,
    },
    {
      id: 200,
      name: "Bob",
      dateOfBirth: "2000-02-29",
      lastUpdatedAt,
    },
    {
      id: 300,
      name: "Carol",
      dateOfBirth: "2000-03-20",
      lastUpdatedAt,
    },
    {
      id: 400,
      name: "Dave",
      dateOfBirth: "2000-04-29",
      lastUpdatedAt,
    },
    {
      id: 500,
      name: "Ellen",
      dateOfBirth: "2000-05-03",
      lastUpdatedAt,
    },
  ]

  return users
})
