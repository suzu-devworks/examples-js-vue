<script setup lang="ts">
import { ErrorMessage, useFieldArray } from 'vee-validate'

import type { MemberValues } from '../types'
import FormTextField from './FormTextField.vue'

const { fields, push, remove } = useFieldArray<MemberValues>('members')
</script>

<template>
  <div class="article-example">
    <h3>Members (list, 1 to 3 items, unique names)</h3>
    <ErrorMessage name="members" as="p" class="list-error" role="alert" />
    <div v-for="(field, index) in fields" :key="field.key" class="member">
      <FormTextField :name="`members[${index}].name`" label="Name" />
      <FormTextField :name="`members[${index}].quantity`" label="Quantity" type="number" />
      <button type="button" class="button-secondary remove" @click="remove(index)">Remove</button>
    </div>
    <button type="button" class="button-secondary" @click="push({ name: '', quantity: 1 })">Add member</button>
  </div>
</template>

<style scoped>
.member {
  display: flex;
  gap: var(--app-spacing-md);
  align-items: flex-start;
}

.member + .member {
  padding-top: var(--app-spacing-sm);
  border-top: 1px solid var(--app-surface-border);
}

.remove {
  margin-top: 1.6em;
}

.list-error {
  color: #c0392b;
}
</style>
