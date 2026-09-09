<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>

<template>
  <p class="simple-component registered-component">{{ title }} has {{ likes }} likes.</p>
</template>
