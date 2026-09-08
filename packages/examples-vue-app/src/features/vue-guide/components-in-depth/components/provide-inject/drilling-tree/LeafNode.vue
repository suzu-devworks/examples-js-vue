<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  message?: string
}>()

const id = useId()
</script>

<template>
  <div class="leaf-node" :id="id">
    <span>🍃Leaf:</span>
    <input type="text" name="message" :value="message" readonly />
  </div>
</template>
