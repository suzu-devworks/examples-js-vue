// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    // Do not generate shims file when using Volar in VSCode (false).
    shim: false,
    // Strict type checking.
    strict: true,
    // Nuxt TypeScript TypeCheck is not used because it is incompatible with vue's ｀script setup` (No default export).
    // Use vue-tsc instead
    typeCheck: false,
  },
  // for vscode debug.
  sourcemap: {
    server: true,
    client: true,
  },
})
