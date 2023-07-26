<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing

definePageMeta({
  middleware: "auth",
})
</script>

<template>
  <div>
    <h1>Routing</h1>
    <h2>Welcome to your dashboard</h2>
  </div>
</template>
