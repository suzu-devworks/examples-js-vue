import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler((event) => {
  // Obtain user information that has already been verified and stored on the middleware side
  const user = event.context.auth as {
    sub: number
    username: string
    role: string
  }

  // Thanks to middleware, only “reliably authenticated requests” can reach here.
  return {
    id: user.sub,
    name: user.username,
    email: `${user.username}@example.com`,
    role: user.role,
    message: 'Successfully accessed protected profile via server middleware!',
  }
})
