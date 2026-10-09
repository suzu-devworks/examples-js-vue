<script setup lang="ts">
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
const toaster = { max: 3, duration: 5000 }
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <GlobalLoading />
  </UApp>
</template>
