<script setup lang="ts">
import { computed, ref } from 'vue'
// options based
const emit = defineEmits({
  change: (count: number) => {
    const _ = count
    return true
  },
  update: (value: string) => {
    const _ = value
    return true
  },
})

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
