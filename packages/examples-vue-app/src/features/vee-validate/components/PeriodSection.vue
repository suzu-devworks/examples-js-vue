<script setup lang="ts">
import { ErrorMessage } from 'vee-validate'

import FormTextField from './FormTextField.vue'
</script>

<template>
  <div class="article-example">
    <h3>Period (date range)</h3>
    <div class="row">
      <FormTextField name="startDate" label="Start date" type="date" hide-error />
      <FormTextField name="endDate" label="End date" type="date" hide-error />
    </div>
    <ErrorMessage name="startDate" as="p" class="error" role="alert" />
    <ErrorMessage name="endDate" as="p" class="error" role="alert" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: var(--app-spacing-md);
  align-items: flex-start;
}

.error {
  margin: 0;
  color: #c0392b;
}
</style>
