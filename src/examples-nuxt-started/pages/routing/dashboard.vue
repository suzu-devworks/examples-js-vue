<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing

definePageMeta({
  middleware: "auth",
})
</script>

<template>
  <div>
    <h1>Routing</h1>
    <p>Welcome to your dashboard</p>
  </div>
</template>
