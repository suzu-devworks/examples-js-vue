<script setup lang="ts">
const { callback, callbackAsync } = defineProps<{
  label?: string
  callback?: (value: Date) => void
  callbackAsync?: (value: Date) => Promise<void>
}>()

async function onClick(value: Date) {
  if (callback !== undefined) {
    callback(value)
  }
  if (callbackAsync !== undefined) {
    await callbackAsync(value)
    // console.log('async callback completed')
  }
}
</script>

<template>
  <div class="callback-component registered-component">
    <button type="button" @click="onClick(new Date())">{{ label }}</button>
  </div>
</template>
