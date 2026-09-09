<script setup lang="ts">
const title = defineModel<string>('title', { required: true })
</script>

<template>
  <div class="my-component registered-component">
    <input type="text" v-model="title" name="title" />
  </div>
</template>
