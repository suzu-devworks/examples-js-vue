<script setup lang="ts">
defineProps({
  disabled: Boolean,
  // disabled will be casted to true
  disabledA: [Boolean, Number],
  // disabled will be casted to true
  disabledB: [Boolean, String],
  // disabled will be casted to true
  disabledC: [Number, Boolean],
  // disabled will be parsed as an empty string (disabled="")
  disabledD: [String, Boolean],
})
</script>

<template>
  <div class="boolean-casting-component registered-component">
    <ul>
      <li>disabled: Boolean: {{ disabled }}</li>
      <li>disabledA: [Boolean, Number]: {{ disabledA }}</li>
      <li>disabledB: [Boolean, String]: {{ disabledB }}</li>
      <li>disabledC: [Number, Boolean]: {{ disabledC }}</li>
      <li>disabledD: [String, Boolean]: {{ disabledD }}</li>
    </ul>
  </div>
</template>
