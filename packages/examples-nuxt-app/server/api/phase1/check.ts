import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler((event) => {
  console.log(`--- [Nitro API] ${event.url.pathname} was called (${new Date().toLocaleTimeString()}) ---`)

  return {
    calledAt: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    message: 'Hello from Nitro Server Engine!',
  }
})
