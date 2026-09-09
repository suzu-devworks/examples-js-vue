<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div class="child-component registered-component"><span>My input</span> <input v-model="model" name="text" /></div>
</template>
