<script setup lang="ts">
import { provide, ref } from 'vue'

import BranchNode from './BranchNode.vue'
import LeafNode from './LeafNode.vue'

const message = ref('hello provide/inject.')
provide('message', message)
</script>

<template>
  <div class="tree-component registered-component">
    <details open>
      <summary>🌳Root <input type="text" name="message" v-model="message" /></summary>
      <ul>
        <li><LeafNode /></li>
        <li><BranchNode /></li>
        <li><BranchNode /></li>
      </ul>
    </details>
  </div>
</template>

<style lang="css" scoped>
.tree-component {
  :deep(summary) {
    padding: 0 var(--app-spacing-sm);
    background-color: color-mix(in srgb, var(--app-color-primary) 20%, var(--app-surface-section));
    border-radius: var(--app-radius-sm);

    > span {
      padding: var(--app-spacing-sm);
    }
  }

  :deep(li) {
    margin: var(--app-spacing-xs) 0;
  }

  :deep(li):has(.branch-node) {
    margin-left: -1em;
    list-style: none;
  }

  :deep(li) .leaf-node {
    display: flex;
    gap: var(--app-spacing-xs);
    align-items: center;
  }
}
</style>
