<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing

// access the current route details
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
/* eslint no-console: off */
console.log("useRoute:", route.params.id)

definePageMeta({
  // Nuxt offers route validation via the validate property in definePageMeta.
  // eslint-disable-next-line require-await
  validate: async (route) => {
    //     // Check if the id is made up of digits
    //     return /^\d+$/.test(route.params.id as string)
    const valid = /^\d+$/.test(route.params.id as string)
    console.log("validate:", route.params.id, valid)
    return valid
  },
  // https://nuxt.com/docs/getting-started/transitions
  pageTransition: false,
  layoutTransition: false,
})
</script>

<template>
  <div>
    <h1>Routing</h1>
    <section>
      <h2>Page {{ route.params.id }}</h2>
    </section>
  </div>
</template>
