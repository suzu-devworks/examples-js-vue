// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      // https://nuxt.com/docs/getting-started/seo-meta
      htmlAttrs: {
        lang: "ja",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          // https://nuxt.com/docs/getting-started/styling
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },
  // https://nuxt.com/docs/getting-started/configuration
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
  css: [
    // https://nuxt.com/docs/getting-started/styling
    "animate.css",
    "~/assets/css/main.scss",
  ],
  vite: {
    build: {
      target: "esnext",
    },
    // https://nuxt.com/docs/getting-started/assets
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
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
