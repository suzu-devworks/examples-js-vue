<script setup lang="ts">
const model = defineModel<number | undefined>({ required: true })

function update() {
  const current = Number(model.value) || 0
  model.value = current + 1
}
</script>

<template>
  <div class="two-way-component registered-component">
    <p>Parent bound v-model is: {{ model }}</p>
    <button type="button" @click="update">Increment</button>
  </div>
</template>
