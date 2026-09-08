<script setup lang="ts">
defineEmits<{
  // (e: 'someEvent'): void
  // Vue 3.3+
  someEvent: []
}>()
</script>

<template>
  <div class="my-component registered-component">
    <button type="button" @click="$emit('someEvent')">Click Me</button>
  </div>
</template>
