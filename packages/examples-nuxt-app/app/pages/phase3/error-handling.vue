<script setup lang="ts">
import { computed, ref } from 'vue'

import { useErrorHandledFetch } from '~/composables/useErrorHandledFetch'

// Reactive variable to toggle the status code to test (401, 500, 200, etc.)
const errorCode = ref<number>(500)
const requestUrl = computed(() => `/api/phase3/test-error?code=${errorCode.value}`)

// Acquire data using custom hook (onResponseError runs automatically in case of error)
const {
  data,
  pending: isLoading,
  error,
  execute,
} = await useErrorHandledFetch<{ success: boolean; message: string }>(requestUrl, {
  watch: [errorCode],
})
</script>

<template>
  <article>
    <header>
      <h2>Step 10: Customize `useFetch` for Consistent Error Handling</h2>
    </header>

    <section>
      <p>
        Demonstrates <code>createUseFetch</code> with an <code>onResponseError</code> interceptor to handle 401, 500,
        and other HTTP errors consistently.
      </p>

      <div class="controls">
        <label>
          Test API Status Code:
          <select v-model.number="errorCode">
            <option :value="200">200 OK (Success)</option>
            <option :value="401">401 Unauthorized (Redirect to Login)</option>
            <option :value="500">500 Internal Server Error (Show Error Page)</option>
          </select>
        </label>
        <button :aria-busy="isLoading" @click="() => execute()">Send Request</button>
      </div>

      <!-- UI display when an error occurs -->
      <p v-if="error" class="notice">
        <code
          >⚠️ Error caught: Status <strong>{{ error.status }}</strong> - {{ error.message }}</code
        >
      </p>

      <!-- Data display upon success -->
      <div v-if="data" class="card">
        <h3>Success Result</h3>
        <p>{{ data.message }}</p>
      </div>
    </section>
  </article>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

.card {
  padding: 1.5rem;
  background-color: var(--card-background-color);
  border: 1px solid var(--muted-border-color);
  border-radius: var(--border-radius);
}

.notice {
  padding: 1rem;
  margin-top: 1rem;
  color: var(--pico-color-red-650, #c0392b);
  background-color: var(--pico-color-red-50, #fadbd8);
  border-radius: var(--border-radius);

  code {
    background-color: transparent;
  }
}
</style>
