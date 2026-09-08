<script setup lang="ts">
import { inject } from 'vue'

const value = inject('message', 'default value')
</script>

<template>
  <div class="tree-component registered-component">
    <p>{{ value }}</p>
  </div>
</template>
