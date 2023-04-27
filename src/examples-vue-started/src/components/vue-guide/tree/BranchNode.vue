<script setup lang="ts">
import LeafGrobalNode from "./LeafGlobalNode.vue"
import LeafNode from "./LeafNode.vue"
</script>

<template>
  <div class="branch-node">
    <p>Branch</p>
    <ul>
      <li><LeafGrobalNode /></li>
      <li><LeafNode /></li>
      <li><LeafNode /></li>
    </ul>
  </div>
</template>
