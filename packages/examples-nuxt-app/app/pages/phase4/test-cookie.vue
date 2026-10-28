<script setup lang="ts">
import { ref, definePageMeta, navigateTo, useAuthToken, useRoute, type IFetchError } from '#imports'

// Apply root middleware to the page
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()

const verifyResult = ref<Record<string, unknown> | null>(null)

// Call useAuthToken created in Step 12
const { token, clearToken } = useAuthToken()

// Hit the server-side validation API using the saved token
const handleVerify = async () => {
  try {
    verifyResult.value = await $fetch<Record<string, unknown>>('/api/phase4/verify', {
      headers: {
        // Give the token in the cookie as a Bearer token
        Authorization: `Bearer ${token.value}`,
      },
    })
  } catch (error) {
    const err = error as IFetchError
    verifyResult.value = err.data ?? { error: 'Verification failed' }
  }
}

const handleLogout = () => {
  clearToken()
  verifyResult.value = null
  navigateTo({
    path: '/phase4/login',
    query: { redirect: route.fullPath },
  })
}
</script>

<template>
  <article>
    <header>
      <h2>Step 12: Manage tokens with <code>useCookie</code></h2>
    </header>

    <section>
      <p>
        Manage authentication tokens safely using <code>useCookie</code>. The token can be accessed seamlessly from both
        the server (SSR) and client, ensuring proper hydration and security options.
      </p>

      <div class="card">
        <h3>Welcome, You are Logged In!</h3>
        <p><strong>Stored Token (Cookie):</strong></p>
        <div class="token-box">
          <pre><code>{{ token }}</code></pre>
        </div>

        <div class="grid">
          <button @click="handleVerify">Verify Token via API</button>
          <button class="secondary outline" @click="handleLogout">Logout</button>
        </div>

        <div v-if="verifyResult" class="result-box">
          <h4>Verification Result:</h4>
          <pre><code>{{ JSON.stringify(verifyResult, null, 2) }}</code></pre>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped lang="css">
.token-box,
.result-box {
  padding: 1rem;
  margin-top: 0.5rem;
  overflow-x: auto;
  font-size: 0.85rem;
  border-radius: 4px;
}
</style>
