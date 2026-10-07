<script setup lang="ts">
import FormCheckbox from './FormCheckbox.vue'
import FormTextField from './FormTextField.vue'
</script>

<template>
  <div class="article-example">
    <h3>Basic (string / number / boolean)</h3>
    <FormTextField name="name" label="Name" />
    <FormTextField name="age" label="Age" type="number" />
    <FormCheckbox name="agree" label="I agree to the terms" />
  </div>
</template>
