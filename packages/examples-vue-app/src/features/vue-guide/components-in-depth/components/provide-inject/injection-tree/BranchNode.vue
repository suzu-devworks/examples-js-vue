<script setup lang="ts">
import LeafNode from './LeafNode.vue'
</script>

<template>
  <div class="branch-node">
    <details open>
      <summary>🪾Branch</summary>
      <ul>
        <li><LeafNode /></li>
        <li><LeafNode /></li>
      </ul>
    </details>
  </div>
</template>
