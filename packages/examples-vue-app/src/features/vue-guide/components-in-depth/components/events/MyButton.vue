<script setup lang="ts">
defineEmits<{
  increaseBy: [value: number]
}>()
</script>

<template>
  <div class="my-component registered-component">
    <button type="button" @click="$emit('increaseBy', 1)">Increase by 1</button>
  </div>
</template>
