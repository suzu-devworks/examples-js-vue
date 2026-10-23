// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Use Pico.css for styling
  css: ['@picocss/pico/css/pico.min.css', '@picocss/pico/css/pico.colors.min.css'],

  // Setting to completely turn off automatic import
  imports: {
    autoImport: false,
  },
  components: {
    dirs: [],
  },

  // ★Step 1: Dynamic control of runtime settings
  runtimeConfig: {
    // Server-side only (secret key invisible to the browser)
    apiSecretKey: 'MY_SUPER_SECRET_KEY_12345',

    // Settings that can be exposed to clients (browsers)
    public: {
      apiBaseUrl: 'http://localhost:3000/api',
    },
  },
})
