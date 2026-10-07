<script setup lang="ts">
import AddressFields from './AddressFields.vue'
import FormTextField from './FormTextField.vue'
</script>

<template>
  <div class="article-example">
    <h3>Contact (sub component with nested sub component)</h3>
    <FormTextField name="email" label="Email" type="email" />
    <AddressFields prefix="address" />
  </div>
</template>
