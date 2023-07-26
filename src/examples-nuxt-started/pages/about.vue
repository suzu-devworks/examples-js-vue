<script setup lang="ts">
// https://nuxt.com/docs/getting-started/views

// https://nuxt.com/docs/getting-started/transitions
definePageMeta({
  pageTransition: {
    name: "rotate",
  },
})
</script>

<template>
  <div>
    <h1>About</h1>
    <p>This page will be displayed at the /about route.</p>
  </div>
</template>
