// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Use Pico.css for styling
  css: ['@picocss/pico/css/pico.min.css'],
})
