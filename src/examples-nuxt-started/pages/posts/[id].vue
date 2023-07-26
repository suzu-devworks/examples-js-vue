<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing

// access the current route details
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
/* eslint no-console: off */
console.log(route.params.id)

// Nuxt offers route validation via the validate property in definePageMeta.
definePageMeta({
  // eslint-disable-next-line require-await
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string)
  },
})

// https://nuxt.com/docs/getting-started/transitions
// disable transition
definePageMeta({
  pageTransition: false,
  layoutTransition: false,
})
</script>

<template>
  <div>
    <h1>Page {{ route.params.id }}</h1>
  </div>
</template>
