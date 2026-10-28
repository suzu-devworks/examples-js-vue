import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((/* nuxtApp */) => {
  const isServer = import.meta.server
  const environmentName = isServer ? 'Server (SSR)' : 'Client (CSR)'

  console.log(`[Nuxt Plugin] Initializing application on: ${environmentName}`)

  // Example of providing utilities and initialization that can be shared across applications
  return {
    provide: {
      appVersion: '4.0.0-learn',
      logMessage: (msg: string) => {
        console.log(`[App Logger] (${environmentName}): ${msg}`)
      },
    },
  }
})
