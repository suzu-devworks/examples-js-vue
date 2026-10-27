import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'

export default defineEventHandler((event) => {
  // Passing event as an argument is a best practice in Nuxt 4
  const config = useRuntimeConfig(event)

  // Output to the terminal (console) where the server is running
  console.log('--- Check on Nitro server (API) side ---')
  console.log('Secret Key (Server):', config.apiSecretKey)

  return {
    message: 'The private key can be read from the server (Nitro) side',
    publicUrl: config.public.apiBaseUrl,
    // Mask the secret key in the response when it has a value.
    secretKeyExposed: config.apiSecretKey ? '*********' : null,
  }
})
