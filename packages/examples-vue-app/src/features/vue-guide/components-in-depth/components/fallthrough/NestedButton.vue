<script setup lang="ts">
import MyButton from './MyButton.vue'

defineProps<{
  category?: string
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <MyButton class="nested-button registered-component" />
</template>
