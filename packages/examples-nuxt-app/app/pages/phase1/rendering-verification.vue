<script setup lang="ts">
import { useFetch, useState, onMounted, ref } from '#imports'

// 1. Inherit the server's absolute time
const serverInstant = useState<number>('server-instant', () => {
  return Temporal.Now.instant().epochMilliseconds
})

const clientInstant = ref<number | null>(null)
const hydrationLagText = ref('⏳Calculating...')

onMounted(() => {
  // 2. Get the absolute time of mount (the moment JS runs in the browser)
  clientInstant.value = Temporal.Now.instant().epochMilliseconds

  // 3. Calculate pure processing delay (time lag)
  const lag = clientInstant.value - serverInstant.value
  hydrationLagText.value = `⏱ Hydration completed in ${lag} ms`
})

const formatInstant = (ms: number) => {
  var instant = Temporal.Instant.fromEpochMilliseconds(ms)

  // Unify to browser locale/time zone
  return instant.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  })
}

const { data, error } = useFetch('/api/phase1/check')
</script>

<template>
  <article>
    <header>
      <h2>Step 3: Verifying behavior for each rendering mode</h2>
    </header>

    <section>
      <h3 class="menu-header">🧩 Experiment 1: Hydration & Time-lag</h3>
      <p>Compare how the time behaves on <strong>Reload (SSR)</strong> vs <strong>Link Navigation (SPA)</strong>.</p>

      <!-- Absolute time rendered on the server side (converted to browser local representation) -->
      <div class="server-rendered">
        <p>
          <strong>🌐 Server-rendered Time (Normalized):</strong>
          <ClientOnly>
            <code>{{ formatInstant(serverInstant) }}</code>

            <template #fallback>
              <code>⏳</code>
            </template>
          </ClientOnly>
        </p>
      </div>

      <!-- Area to reveal the truth on the browser side using ClientOnly -->
      <ClientOnly>
        <div class="client-rendered">
          <p>
            <strong>💻 Client-side Final Time:</strong>
            <code>{{ clientInstant ? formatInstant(clientInstant) : '⏳' }}</code>
          </p>
          <p class="hydration-text">
            ✔ <strong>Result:</strong> <code>{{ hydrationLagText }}</code>
          </p>
        </div>

        <template #fallback>
          <div class="client-fallback">
            <p class="hydration-text">⏳ Browser JavaScript is loading... (Waiting for hydration)</p>
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- 2. UseFetch communication source (SSR vs SPA) verification area -->
    <footer>
      <h3 class="menu-header">🔍 Experiment 2: Data Fetching Origin</h3>

      <div v-if="error" class="error-message">❌ Fetch Error: {{ error.message }}</div>

      <div v-else-if="data">
        <p>
          Data fetched via <code>useFetch</code>. Open your <strong>Browser Network Tab</strong>, filter by
          <strong>Fetch/XHR</strong>, and test:
        </p>
        <ul>
          <li>
            <strong>On Reload (SSR):</strong> This request runs on Nitro. No network activity appears in the browser!
          </li>
          <li>
            <strong>On Navigation (SPA):</strong> This request runs in the browser. You will see the fetch log
            instantly!
          </li>
        </ul>
        <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
      </div>

      <div v-else>⏳ Loading fetched data...</div>
    </footer>
  </article>
</template>

<style scoped>
.error-message {
  color: var(--pico-form-element-invalid-border-color);
}

.server-rendered {
  --base-color: var(--pico-color-pumpkin-300);

  padding: 1rem;
  margin-bottom: 1rem;
  background-color: color-mix(in oklab, var(--base-color) 10%, transparent);
  border-left: 4px solid var(--base-color);
}

.client-rendered {
  --base-color: var(--pico-color-jade-300);

  padding: 1rem;
  margin-bottom: 1rem;
  background-color: color-mix(in oklab, var(--base-color) 10%, transparent);
  border-left: 4px solid var(--base-color);

  .hydration-text {
    margin-bottom: 0;
    color: var(--base-color);
  }
}

.client-fallback {
  --base-color: var(--pico-color-azure-300);

  padding: 1rem;
  background-color: color-mix(in oklab, var(--base-color) 10%, transparent);
  border-left: 4px solid var(--base-color);

  .hydration-text {
    margin-bottom: 0;
    color: var(--base-color);
  }
}
</style>
