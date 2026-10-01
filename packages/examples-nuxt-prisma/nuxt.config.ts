// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        module: 'ESNext',
        moduleResolution: 'bundler',
        target: 'ES2023',
        strict: true,
        esModuleInterop: true,
        ignoreDeprecations: '6.0',
        types: ['node'],
      },
    },
  },
})
