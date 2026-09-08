<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  modelModifiers?: { capitalize: boolean }
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
}>()

function emitValue(event: Event) {
  let value = (event.target as HTMLInputElement)?.value

  console.log('emitValue', value, props.modelModifiers?.capitalize)
  if (props.modelModifiers?.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }

  emit('update:modelValue', value)
}
</script>

<template>
  <div class="my-input registered-component">
    <input type="text" :value="modelValue" @input="emitValue" />
  </div>
</template>
