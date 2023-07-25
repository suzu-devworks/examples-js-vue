<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing

definePageMeta({
  middleware: "auth",
})
</script>

<template>
  <h1>Welcome to your dashboard</h1>
</template>
