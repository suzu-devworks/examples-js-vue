<script setup lang="ts">
const [model, modifiers] = defineModel<string>({
  set(value) {
    console.log('emitValue', value, modifiers.capitalize)
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  },
})
</script>

<template>
  <div class="my-input registered-component">
    <input type="text" v-model="model" />
  </div>
</template>
