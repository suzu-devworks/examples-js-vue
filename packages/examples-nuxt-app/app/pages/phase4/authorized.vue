<script setup lang="ts">
import { useAuthorizedFetch } from '~/composables/useAuthorizedFetch'

interface VerifyResponse {
  authenticated: boolean
  message: string
  user: {
    id: number
    username: string
    role: string
  }
}

// Call validation API with custom fetch with authentication
// Automatically sent if the cookie has a valid Bearer token
const { data, pending, error } = await useAuthorizedFetch<VerifyResponse>('/api/phase4/verify')
</script>

<template>
  <article>
    <header>
      <h2>Step 13: Bearer Authentication with `useAuthorizedFetch`</h2>
    </header>

    <section>
      <p v-if="pending">Verifying session...</p>

      <p v-else-if="error" class="notice">⚠️ Authentication Error: {{ error.data || error.message }}</p>

      <div v-else-if="data" class="card">
        <h3>✅ Authorized Access Successful</h3>
        <p><strong>Message:</strong> {{ data.message }}</p>
        <p><strong>Logged in as:</strong> {{ data.user.username }} (Role: {{ data.user.role }})</p>
      </div>
    </section>
  </article>
</template>
