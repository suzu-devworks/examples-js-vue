<script setup lang="ts">
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  },
})

function submitForm(email: string, password: string) {
  emit('submit', { email, password })
}

import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<script setup lang="ts"></script>

<template>
  <div class="my-login registered-component">
    <form @submit.prevent="submitForm(email, password)">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" autocomplete="off" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
