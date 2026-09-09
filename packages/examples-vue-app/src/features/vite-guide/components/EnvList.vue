<script setup lang="ts" generic="T">
import type { NamedValue } from '../types'

defineProps<{
  items: NamedValue<T>[]
}>()
</script>

<template>
  <ul class="env-list">
    <li v-for="(item, index) in items" :key="index">
      <code>{{ item.name }}: {{ item.value }} ({{ typeof item.value }})</code>
    </li>
  </ul>
</template>
