<script setup lang="ts">
import { computed, ref } from 'vue'
// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [count: number]
  update: [value: string]
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
    <input v-model="binder" type="text" name="text" @change="emit('change', ++counter)" />
  </div>
</template>
