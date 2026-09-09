<script setup lang="ts">
import { computed, ref } from 'vue'
// type-based
const emit = defineEmits<{
  (e: 'change', count: number): void
  (e: 'update', value: string): void
}>()

const counter = ref(0)
const textValue = ref('')
const binder = computed({
  get: () => textValue.value,
  set: (value) => {
    textValue.value = value
    emit('update', value)
  },
})
</script>

<template>
  <div class="my-text registered-component">
    <input type="text" v-model="binder" @change="emit('change', ++counter)" name="text" />
  </div>
</template>
