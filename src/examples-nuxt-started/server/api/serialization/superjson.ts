import { stringify } from "superjson"

export default defineEventHandler(() => {
  const data = {
    createdAt: new Date(),

    // Workaround the type conversion
    toJSON() {
      return this
    },
  }

  // Serialize the output to string, using superjson
  return stringify(data) as unknown as typeof data
})
