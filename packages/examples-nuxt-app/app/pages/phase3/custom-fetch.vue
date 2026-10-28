<script setup lang="ts">
import { ref, useCustomFetch, useNuxtApp } from '#imports'

const { $customFetch } = useNuxtApp()

const selectedVersion = ref<'composable' | 'plugin'>('composable')
const inputMessage = ref('Hello Nuxt 4 Custom Fetch!')

interface ApiResult {
  success: boolean
  usedVersion: string
  receivedBody: { message: string }
  receivedHeaders: {
    'x-api-key': string | null
    'x-request-id': string | null
  }
}

const resultData = ref<ApiResult | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = null
  resultData.value = null
  const url = '/api/phase3/check-headers'

  try {
    if (selectedVersion.value === 'composable') {
      await fetchWithComposable(url)
    } else {
      await fetchWithPlugin(url)
    }
  } catch (err: unknown) {
    errorMessage.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    isLoading.value = false
  }

  async function fetchWithPlugin(url: string) {
    // Version A: Send via wrapper using createUseFetch (POST)
    const response = await $customFetch<ApiResult>(url, {
      method: 'POST',
      body: { message: inputMessage.value },
    })

    resultData.value = response
  }

  async function fetchWithComposable(url: string) {
    // Version B: Send using $fetch plugin instance ($customFetch)
    const { data, error } = await useCustomFetch<ApiResult>(url, {
      method: 'POST',
      body: { message: inputMessage.value },
    })
    if (error.value) {
      throw new Error('Composable fetch failed')
    }

    if (data.value) {
      resultData.value = data.value
    }
  }
}
</script>

<template>
  <article>
    <header>
      <h2>Step 9: Compare Fetch Customization Versions</h2>
    </header>

    <section>
      <p>
        Select which implementation version to use for submitting the request, then inspect the injected headers and
        payload on the server.
      </p>

      <form @submit.prevent="handleSubmit">
        <fieldset>
          <legend>Choose Customization Version:</legend>
          <label>
            <input v-model="selectedVersion" type="radio" name="version" value="composable" />
            <strong>Version 1:</strong> <code>createUseFetch</code> (Composable wrapper with auto cache-key & headers)
          </label>
          <label>
            <input v-model="selectedVersion" type="radio" name="version" value="plugin" />
            <strong>Version 2:</strong> <code>$fetch.create()</code> Plugin (Intercepts requests via
            <code>$customFetch</code>)
          </label>
        </fieldset>

        <label>
          Message Payload:
          <input v-model="inputMessage" type="text" placeholder="Type a message..." required />
        </label>

        <button type="submit" :aria-busy="isLoading">Send Request</button>
      </form>

      <p v-if="errorMessage" class="notice">{{ errorMessage }}</p>

      <div v-if="resultData" class="card">
        <h3>Server Response & Verification</h3>
        <ul>
          <li><strong>Submitted Message:</strong> {{ resultData.receivedBody.message }}</li>
          <li>
            <strong>x-api-key:</strong> <code>{{ resultData.receivedHeaders['x-api-key'] || 'None' }}</code>
          </li>
          <li>
            <strong>x-request-id:</strong> <code>{{ resultData.receivedHeaders['x-request-id'] || 'None' }}</code>
          </li>
        </ul>
        <details>
          <summary>Raw JSON Response</summary>
          <pre>{{ JSON.stringify(resultData, null, 2) }}</pre>
        </details>
      </div>
    </section>
  </article>
</template>

<style scoped>
.card {
  padding: 1.5rem;
  margin-top: 1.5rem;
  background-color: var(--card-background-color);
  border: 1px solid var(--muted-border-color);
  border-radius: var(--border-radius);
}

.notice {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--ins-color);
}
</style>
