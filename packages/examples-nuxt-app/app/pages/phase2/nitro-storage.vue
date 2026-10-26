<script setup lang="ts">
import { ref, useFetch } from '#imports'

const clearMessage = ref('')

const {
  data: apiResponse,
  pending: isLoading,
  refresh,
} = await useFetch('/api/phase2/cached-data', {
  // Describe options as necessary
})

// Manual re-fetching by clicking the button (updates the latest fetch results)
const handleFetchClick = async () => refresh()

// Clear cache
const handleClearCache = async () => {
  const res = await $fetch('/api/phase2/clear-cache')
  clearMessage.value = (res as { message: string }).message
}
</script>

<template>
  <article>
    <header>
      <h2>Step 5: Nitro Storage API Caching</h2>
    </header>

    <section>
      <h3>♻️ Test server-side caching using Nitro's <code>useStorage()</code></h3>
      <p>
        The first request takes 2 seconds (Cache Miss), while subsequent requests respond instantly (Cache Hit) until
        the cache is cleared.
      </p>

      <div class="grid">
        <button :aria-busy="isLoading" @click="handleFetchClick">Fetch Data</button>
        <button class="secondary outline" @click="handleClearCache">Clear Server Cache</button>
      </div>

      <p v-if="clearMessage" class="notice">{{ clearMessage }}</p>

      <div v-if="apiResponse" class="card">
        <h3>Response Result</h3>
        <ul>
          <li>
            <strong>Source:</strong>
            <span :class="apiResponse.source === 'cache' ? 'badge-cache' : 'badge-server'">{{
              apiResponse.source
            }}</span>
          </li>
          <li><strong>Message:</strong> {{ apiResponse.message }}</li>
          <li><strong>Fetched At:</strong> {{ apiResponse.fetchedAt }}</li>
        </ul>
        <details>
          <summary>Raw JSON Data</summary>
          <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </details>
      </div>
    </section>
  </article>
</template>

<style scoped lang="css">
.container {
  max-width: 800px;
  margin: 2rem auto;
}

.card {
  padding: 1.5rem;
  margin-top: 1.5rem;
  background-color: var(--card-background-color);
  border: 1px solid var(--muted-border-color);
  border-radius: var(--border-radius);
}

.badge-cache {
  padding: 0.2rem 0.5rem;
  font-weight: bold;
  color: var(--pico-color-green-650);
  background-color: var(--pico-color-green-50);
  border-radius: 4px;
}

.badge-server {
  padding: 0.2rem 0.5rem;
  font-weight: bold;
  color: var(--pico-color-pink-650);
  background-color: var(--pico-color-pink-50);
  border-radius: 4px;
}

.notice {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--ins-color);
}
</style>
