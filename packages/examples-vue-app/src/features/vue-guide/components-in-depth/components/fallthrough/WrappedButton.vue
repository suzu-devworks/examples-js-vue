<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="wrapped-button registered-component">
    <button type="button" class="button" v-bind="$attrs">Click Me</button>
  </div>
</template>
