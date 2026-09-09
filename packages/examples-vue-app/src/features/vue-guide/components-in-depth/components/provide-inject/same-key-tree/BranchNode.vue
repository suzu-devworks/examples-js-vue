<script setup lang="ts">
import { provide, ref } from 'vue'

import LeafNode from './LeafNode.vue'

const { initial } = defineProps<{
  initial?: string
}>()

const message = ref(initial ?? '')
provide('message', message)
</script>

<template>
  <div class="branch-node">
    <details open>
      <summary>🪾Branch</summary>
      <input type="text" name="message" v-model="message" />
      <ul>
        <li><LeafNode /></li>
        <li><LeafNode /></li>
      </ul>
    </details>
  </div>
</template>
