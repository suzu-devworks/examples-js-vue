<script setup lang="ts">
import { navigateTo, useAuthorizedFetch, useAuthToken, useRoute } from '#imports'

interface VerifyResponse {
  authenticated: boolean
  message: string
  user: {
    id: number
    username: string
    role: string
  }
}

const route = useRoute()
const { clearToken } = useAuthToken()

// Call validation API with custom fetch with authentication
// Automatically sent if the cookie has a valid Bearer token
const { data, pending, error } = await useAuthorizedFetch<VerifyResponse>('/api/phase4/verify')

const handleLogout = () => {
  clearToken()
  navigateTo({
    path: '/phase4/login',
    query: { redirect: route.fullPath },
  })
}
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

        <div class="grid">
          <button class="secondary outline" @click="handleLogout">Logout</button>
          <div></div>
        </div>
      </div>
    </section>
  </article>
</template>
