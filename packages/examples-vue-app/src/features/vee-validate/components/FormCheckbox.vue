<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

const props = defineProps<{ name: string; label: string }>()

const { checked, errorMessage, handleChange } = useField<boolean>(toRef(props, 'name'), undefined, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false,
})
</script>

<template>
  <div class="field">
    <label>
      <input type="checkbox" :name="name" :checked="checked" @change="handleChange(true)" />
      {{ label }}
    </label>
    <p v-if="errorMessage" class="field__error" role="alert">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 0.75rem;
}

.field__error {
  margin: 0.25rem 0 0;
  color: #c0392b;
}
</style>
