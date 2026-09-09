<script setup lang="ts">
import { watch } from 'vue'

const {
  propE = 100,
  propF = { message: 'hello' },
  propG,
  propH = () => 'Default function',
} = defineProps<{
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA?: number
  // Multiple possible types
  propB?: string | number
  // Required string
  propC: string
  // Required but nullable string
  propD: string | null
  // Number with a default value (Set the default value on the destructuring assignment side)
  propE: number
  // Object with a default value (Set the default value on the destructuring assignment side)
  propF: object
  // Custom validator function (Requires separate handling)
  propG?: string
  // Function with a default value
  propH?: () => void | string
  //
}>()

watch(
  () => propG,
  (newValue) => {
    if (newValue && !['success', 'warning', 'danger'].includes(newValue)) {
      console.warn(`Invalid prop value: ${newValue}`)
    }
  },
  { immediate: true }
)

const _propE = propE
const _propF = propF
const _propH = propH
</script>

<template>
  <p class="type-validatable-component registered-component">Type Component is valid</p>
</template>
