<script setup lang="ts">
defineProps({
  id: {
    type: [String, null],
    required: true,
  },
})
</script>

<template>
  <p class="nullable-component registered-component">id is {{ id === null ? 'null' : 'not null' }}.</p>
</template>
