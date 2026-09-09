<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <p class="my-component registered-component">{{ message }}</p>
</template>
