<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
})

const { seo } = useAppConfig()

useSeoMeta({
  titleTemplate: (title) => (title ? `%s - ` : '' + `${seo?.siteName}`),
  description: seo?.description,
  ogTitle: seo?.siteName,
  ogDescription: seo?.description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image',
})

// toaster configuration
const toaster: ToasterProps = { max: 3, duration: 5000, position: 'top-right' }

// set locale based on browser settings
const { state, initLocale } = useAppLocale()

onMounted(() => {
  initLocale()
})
</script>

<template>
  <UApp :toaster="toaster" :locale="state.current">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <GlobalLoading />
  </UApp>
</template>
