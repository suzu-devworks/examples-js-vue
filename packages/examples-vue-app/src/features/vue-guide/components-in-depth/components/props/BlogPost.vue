<script setup lang="ts">
const props = defineProps<{
  title?: string
  likes?: number
  isPublished?: boolean
  commentIds?: Array<number>
  author?: { name: string; company?: string }
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="blog-post registered-component" @click="emit('click')">
    <code>props: {{ props }}</code>
  </div>
</template>
