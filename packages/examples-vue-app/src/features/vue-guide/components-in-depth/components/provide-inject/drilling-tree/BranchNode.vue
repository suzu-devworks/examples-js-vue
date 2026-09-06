<script setup lang="ts">
import LeafNode from './LeafNode.vue'

defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="branch-node">
    <details open>
      <summary>🪾Branch</summary>
      <ul>
        <li><LeafNode :message="message" /></li>
        <li><LeafNode :message="message" /></li>
      </ul>
    </details>
  </div>
</template>
