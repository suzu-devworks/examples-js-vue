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
    <input v-model="model" type="text" name="text" />
  </div>
</template>
