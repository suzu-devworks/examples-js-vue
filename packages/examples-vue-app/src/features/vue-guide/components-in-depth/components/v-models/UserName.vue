<script setup lang="ts">
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
</script>

<template>
  <div class="user-name-component registered-component">
    <input v-model="firstName" type="text" name="firstName" />
    <input v-model="lastName" type="text" name="lastName" />
  </div>
</template>

<style lang="css" scoped>
.user-name-component {
  display: flex;
  gap: var(--app-spacing-sm);
  align-items: center;
}
</style>
