// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from './package.json' with { type: 'json' }

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@pinia/nuxt', '@nuxt/eslint'],
  app: {
    head: {
      title: pkg.productName || 'Quasar App',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: pkg.description || 'My Quasar Application' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-tap-highlight', content: 'no' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/icons/favicon-128x128.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' },
      ],
    },
  },

  css: ['@/css/app.scss'],
  quasar: {
    sassVariables: '@/css/quasar.variables.scss',
  },
})
