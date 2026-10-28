<script setup lang="ts">
import { ref } from 'vue'

import { useAuthToken } from '#imports'

const username = ref('admin')
const password = ref('password')
const loading = ref(false)
const errorMessage = ref('')
const verifyResult = ref<Record<string, unknown> | null>(null)

// Extract the response body (`data`) from an error thrown by $fetch
const toErrorData = (err: unknown) => (err as { data?: { statusMessage?: string } } | undefined)?.data

// Call useAuthToken created in Step 12
const { token, setToken, clearToken } = useAuthToken()

// Login processing
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    // Call the login API created in Step 11 (specify practical implementation 'real')
    const res = await $fetch<{ success: boolean; token: string }>('/api/phase4/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
        mode: 'real',
      },
    })

    if (res.success && res.token) {
      // Save token securely across server and client via useCookie
      setToken(res.token)
    }
  } catch (err: unknown) {
    errorMessage.value = toErrorData(err)?.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}

// Hit the server-side validation API using the saved token
const handleVerify = async () => {
  try {
    verifyResult.value = await $fetch<Record<string, unknown>>('/api/phase4/verify', {
      headers: {
        // Give the token in the cookie as a Bearer token
        Authorization: `Bearer ${token.value}`,
      },
    })
  } catch (err: unknown) {
    verifyResult.value = toErrorData(err) ?? { error: 'Verification failed' }
  }
}

const handleLogout = () => {
  clearToken()
  verifyResult.value = null
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

      <div v-if="!token" class="login-wrapper">
        <!-- 未ログイン時のフォーム -->
        <div class="card">
          <h3>Login</h3>
          <form @submit.prevent="handleLogin">
            <label>
              Username
              <input v-model="username" type="text" placeholder="admin" required />
            </label>
            <label>
              Password
              <input v-model="password" type="password" placeholder="password" required />
            </label>
            <p v-if="errorMessage">
              <small class="error">{{ errorMessage }}</small>
            </p>
            <button type="submit" :aria-busy="loading">Login</button>
          </form>
        </div>
      </div>

      <!-- ログイン中の画面 -->
      <div v-else class="card">
        <h3>Welcome, You are Logged In!</h3>
        <p><strong>Stored Token (Cookie):</strong></p>
        <div class="token-box">
          <pre><code>{{ token }}</code></pre>
        </div>

        <div class="grid button-group">
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
.login-wrapper {
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin-top: 1.5rem;
  background-color: var(--pico-muted-color);

  .card {
    width: 100%;
    max-width: 500px;
    padding: 1.5rem;
    background-color: var(--pico-background-color);
    border: 1px solid var(--pico-muted-border-color);
    border-radius: var(--pico-border-radius);
  }
}

.token-box,
.result-box {
  padding: 1rem;
  margin-top: 0.5rem;
  overflow-x: auto;
  font-size: 0.85rem;
  border-radius: 4px;
}

.error {
  color: var(--pico-color-pink-400);
}

.button-group {
  margin-top: 1rem;
}
</style>
