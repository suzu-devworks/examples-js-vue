<script setup lang="ts">
import { computed, ref } from 'vue'
// runtime
const emit = defineEmits(['change', 'update'])

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
