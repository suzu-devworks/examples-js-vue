<script setup lang="ts">
const title = defineModel<string>('title', { required: true })
</script>

<template>
  <div class="my-component registered-component">
    <input v-model="title" type="text" name="title" />
  </div>
</template>
