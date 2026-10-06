<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

const props = withDefaults(defineProps<{ name: string; label: string; type?: string; hideError?: boolean }>(), {
  type: 'text',
})

const { value, errorMessage, handleBlur } = useField<string | number>(toRef(props, 'name'))
</script>

<template>
  <div class="field">
    <label>
      {{ label }}
      <input v-model="value" :type="type" :name="name" :aria-invalid="!!errorMessage" @blur="handleBlur" />
    </label>
    <p v-if="errorMessage && !hideError" class="field__error" role="alert">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 0.75rem;
}

.field input {
  display: block;
}

.field__error {
  margin: 0.25rem 0 0;
  color: #c0392b;
}
</style>
