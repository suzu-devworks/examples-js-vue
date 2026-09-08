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
    <input type="text" v-model="binder" @change="emit('change', ++counter)" />
  </div>
</template>
