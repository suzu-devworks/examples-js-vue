<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  modelModifiers?: { capitalize: boolean }
}>()
const emit = defineEmits<{
  (e: "update:modelValue", newValue: string): void
}>()

function emitValue(event: Event) {
  let value = (event.target as HTMLInputElement)?.value

  if (props.modelModifiers?.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }

  emit("update:modelValue", value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
