<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  message?: string
}>()

const id = useId()
</script>

<template>
  <div :id="id" class="leaf-node">
    <span>🍃Leaf:</span>
    <input type="text" name="message" :value="message" readonly />
  </div>
</template>
