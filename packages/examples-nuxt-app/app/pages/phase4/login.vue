<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthToken } from '~/composables/useAuthToken'

const username = ref('admin')
const password = ref('password')
const errorMessage = ref('')
const loading = ref(false)

const route = useRoute()
const { setToken } = useAuthToken()

// Extract the response body (`data`) from an error thrown by $fetch
const toErrorData = (err: unknown) => (err as { data?: { statusMessage?: string } } | undefined)?.data

const handleLogin = async () => {
  try {
    const res = await $fetch<{ success: boolean; token: string }>('/api/phase4/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })

    if (res.success && res.token) {
      setToken(res.token)

      // If there is a query parameter (e.g. ?redirect=/phase4/dashboard),
      // return it there, otherwise default to dashboard.
      const redirectPath = (route.query.redirect as string) || '/phase4/dashboard'
      navigateTo(redirectPath)
    }
  } catch (err: unknown) {
    errorMessage.value = toErrorData(err)?.statusMessage || 'login failed'
  }
}
</script>

<template>
  <article>
    <section class="login-wrapper">
      <div class="card">
        <h3>Login</h3>
        <form @submit.prevent="handleLogin">
          <label>
            Username
            <input v-model="username" type="text" required />
          </label>
          <label>
            Password
            <input v-model="password" type="password" required />
          </label>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <button type="submit" :aria-busy="loading">Login</button>
        </form>
      </div>
    </section>
  </article>
</template>

<style scoped lang="css">
.login-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  .card {
    width: 100%;
    max-width: 400px;
    padding: 1.5rem;
  }
}

.error {
  margin-bottom: 1rem;
  color: var(--pico-del-color);
}
</style>
