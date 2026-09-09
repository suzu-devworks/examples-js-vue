<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
const text = ref('Hello')
</script>

<template>
  <div class="child-component registered-component">
    <div class="input-container">
      <input type="number" v-model="counter" name="count" />
      <input type="text" v-model="text" name="text" />
    </div>
    <slot :text="text" :count="counter"></slot>
  </div>
</template>

<style lang="css" scoped>
.child-component {
  .input-container {
    display: flex;
    gap: var(--app-spacing-sm);
  }
}
</style>
