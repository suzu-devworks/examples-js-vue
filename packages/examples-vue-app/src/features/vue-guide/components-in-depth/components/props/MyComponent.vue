<script setup lang="ts">
defineProps<{
  greetingMessage: string
}>()
</script>

<template>
  <p class="my-component registered-component">{{ greetingMessage }}</p>
</template>
