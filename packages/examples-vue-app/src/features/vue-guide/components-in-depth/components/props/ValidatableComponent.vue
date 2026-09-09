<script setup lang="ts">
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true,
  },
  // Required but nullable string
  propD: {
    type: [String, null],
    required: true,
  },
  // Number with a default value
  propE: {
    type: Number,
    default: 100,
  },
  // Object with a default value
  propF: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(_rawProps: object) {
      return { message: 'hello' }
    },
  },
  // Custom validator function
  // full props passed as 2nd argument in 3.4+
  propG: {
    type: String,
    validator(value: string, _props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    },
  },
  // Function with a default value
  propH: {
    type: Function,
    // Unlike object or array default, this is not a factory
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    },
  },
})
</script>

<template>
  <p class="validatable-component registered-component">Component is valid</p>
</template>
