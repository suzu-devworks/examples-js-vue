<script setup lang="ts">
defineEmits<{
  (e: "someEvent", event: Event, object: { message: string }): void
}>()
</script>

<template>
  <button @click="$emit('someEvent', $event, { message: 'fire event!' })"><slot /></button>
</template>
