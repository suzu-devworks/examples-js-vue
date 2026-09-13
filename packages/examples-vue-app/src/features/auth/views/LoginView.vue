<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/useAuthStore'

const router = useRouter()
const route = useRoute()
const redirect = (route.query.redirect || '/') as string

const auth = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

function login() {
  if (!username.value || !password.value) {
    console.log('Username and password are required')
    errorMessage.value = 'Username and password are required'
    return
  }

  const { success, error } = auth.login({ id: username.value, password: password.value })

  if (!success) {
    errorMessage.value = error
    return
  }

  router.push(redirect)
}
</script>

<template>
  <div class="login-view">
    <div class="login-container article-section">
      <form>
        <label>
          Username:
          <input v-model="username" type="text" name="username" autocomplete="off" aria-required="true" />
        </label>
        <label>
          Password:
          <input v-model="password" type="password" name="password" autocomplete="off" aria-required="true" />
        </label>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit" class="button-primary" @click.prevent="login">Login</button>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .note {
    font-size: var(--app-text-sm);
  }

  .login-container {
    max-width: 260px;
    padding: var(--app-spacing-lg);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--app-spacing-sm);
    align-items: center;
    width: 100%;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;

    input {
      font-weight: var(--app-weight-normal);
    }
  }

  button {
    margin-top: var(--app-spacing-md);
  }

  .error {
    padding: var(--app-spacing-sm);
    font-size: var(--app-text-sm);
    font-weight: var(--app-weight-bold);
    color: var(--app-color-on-error);
    background-color: var(--app-color-error);
    border-radius: var(--app-radius-md);
  }
}
</style>
