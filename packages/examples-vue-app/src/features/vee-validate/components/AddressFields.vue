<script setup lang="ts">
import FormTextField from './FormTextField.vue'

// Sub-sub component: field names are relative to the form root, so a prefix is passed in.
defineProps<{ prefix: string }>()
</script>

<template>
  <div class="address">
    <FormTextField :name="`${prefix}.postalCode`" label="Postal code (000-0000)" />
    <FormTextField :name="`${prefix}.city`" label="City" />
  </div>
</template>

<style scoped>
.address {
  margin-left: 1rem;
}
</style>
