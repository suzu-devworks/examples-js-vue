<script setup lang="ts">
import { useAppConfig, useFetch, useRuntimeConfig } from 'nuxt/app'

const config = useRuntimeConfig()
const appConfig = useAppConfig()
console.log('--- Loading check on the screen (pages/phase1) side ---')
console.log('[Common] Public API URL:', config.public.apiBaseUrl)
console.log('[Note] Secret Key:', config.apiSecretKey) // will be undefined in the browser

const { data: apiData, error } = useFetch('/api/phase1/config-test')
</script>

<template>
  <article>
    <header>
      <h2>Step 1: Dynamic control of runtime and configuration</h2>
    </header>

    <p><strong>Application name:</strong> {{ appConfig.appName }}</p>
    <p>
      <strong>Public API URL:</strong> <code>{{ config.public.apiBaseUrl }}</code>
    </p>

    <ClientOnly>
      <!-- Since the `apiSecretKey` would be exposed during server-side rendering (SSR),
        I am using `ClientOnly`.
        In principle, this is a value that should not be configured here in the first place.-->
      <p class="error-message">
        <strong>Secret key (displayed on screen):</strong>
        {{ config.apiSecretKey || '❌ Cannot be accessed from the client side (browser)' }}
      </p>

      <template #fallback>
        <p>Loading secret key...</p>
      </template>
    </ClientOnly>

    <footer>
      <h3 class="menu-header">🔍 Server-side API Connection Status</h3>
      <div v-if="error" class="error-message">❌ API Error: {{ error.message }}</div>
      <div v-else-if="apiData">
        <p>The following data was fetched from the Nitro server:</p>
        <pre><code>{{ JSON.stringify(apiData, null, 2) }}</code></pre>
      </div>
      <div v-else>⏳ Loading API data...</div>
    </footer>
  </article>
</template>

<style scoped>
.error-message {
  color: var(--pico-form-element-invalid-border-color);
}
</style>
