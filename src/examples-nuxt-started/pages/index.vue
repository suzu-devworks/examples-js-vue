<script setup lang="ts">
// https://nuxt.com/docs/getting-started/configuration
const runtimeConfig = useRuntimeConfig()

/* eslint no-console: off */
console.log(`index.vue: runtimeConfig.apiSecret=${runtimeConfig.apiSecret}.`)
console.log(`index.vue: runtimeConfig.public.apiBase=${runtimeConfig.public.apiBase}.`)
/* eslint no-console: warn */

// build time config.
const appConfig = useAppConfig()

/* eslint no-console: off */
console.log(`index.vue: appConfig.title=${appConfig.title}.`)
console.log(`index.vue: appConfig.theme.dark=${appConfig.theme.dark}.`)
console.log(`index.vue: appConfig.theme.colors.primary=${appConfig.theme.colors.primary}.`)
</script>

<template>
  <div class="container">
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
  </div>
</template>
