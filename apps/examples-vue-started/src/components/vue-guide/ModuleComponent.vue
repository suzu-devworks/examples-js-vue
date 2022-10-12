<script setup lang="ts">
import { ref } from "vue"

defineProps<{
  title: string
}>()

const checked = ref<boolean>(false)
</script>

<template>
  <div class="module-component">
    <label>
      <input
        type="checkbox"
        v-model="checked"
        class="tooltip-down"
        :data-tooltip="`checked: ${checked}`"
      />{{ title }}</label
    >
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/balloon-tooltip.scss";

input[type="checkbox"] {
  margin: 0.2em;
}

label {
  color: red;
}
</style>
