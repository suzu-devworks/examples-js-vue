<script setup lang="ts">
import { provide, ref } from 'vue'

import BranchNode from './BranchNode.vue'
import LeafNode from './LeafNode.vue'

const message = ref('root message.')
provide('message', message)
</script>

<template>
  <div class="tree-component registered-component">
    <details open>
      <summary>🌴Root</summary>
      <input v-model="message" type="text" name="message" />
      <ul>
        <li><LeafNode /></li>
        <li><BranchNode initial="this is branch message" /></li>
        <li><BranchNode initial="This is the message for the second branch." /></li>
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
  }

  :deep(details),
  details {
    > input[type='text'] {
      margin-bottom: 0.5em;
      margin-left: 2em;
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
