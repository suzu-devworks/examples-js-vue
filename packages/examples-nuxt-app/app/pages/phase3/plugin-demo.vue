<script setup lang="ts">
import { ref, useState, useNuxtApp } from '#imports'

// Get functionality provided by plugin from NuxtApp
const { $appVersion, $logMessage } = useNuxtApp()

const isServer = useState('isServer', () => import.meta.server)
const clientLogOutput = ref<string[]>([])

const handleTriggerLog = () => {
  const instant = Temporal.Now.instant().toZonedDateTimeISO('UTC')
  const timestamp = instant.toPlainTime().toString({ smallestUnit: 'millisecond' })
  const text = `Button clicked at ${timestamp}Z`
  // Execute the function defined in the plugin
  if (typeof $logMessage === 'function') {
    $logMessage(text)
  }
  clientLogOutput.value.unshift(text)
}
</script>

<template>
  <article>
    <header>
      <h2>Step 8: Inject Initialization Logic with Nuxt Plugins</h2>
    </header>

    <section>
      <p>
        Nuxt plugins run during application initialization on both SSR and CSR. Open your browser and server terminal
        consoles to check the startup logs injected by <code>app/plugins/initializer.ts</code>.
      </p>

      <div class="card">
        <h3>Plugin Injected Properties</h3>
        <ul>
          <li>
            <strong>App Version:</strong> <span class="badge-version">{{ $appVersion }}</span>
          </li>
          <li><strong>Execution Environment:</strong> {{ isServer ? 'Server-side (SSR)' : 'Client-side (CSR)' }}</li>
        </ul>

        <div class="grid button-group">
          <button @click="handleTriggerLog">Trigger Plugin Logger</button>
        </div>

        <div v-if="clientLogOutput.length > 0" class="log-container">
          <h4>Client Log History:</h4>
          <ul>
            <li v-for="(log, index) in clientLogOutput" :key="index">
              <code>{{ log }}</code>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped lang="css">
.card {
  padding: 1.5rem;
  margin-top: 1.5rem;
  background-color: var(--card-background-color);
  border: 1px solid var(--muted-border-color);
  border-radius: var(--border-radius);
}

.badge-version {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-weight: bold;
  color: var(--pico-color-indigo-650);
  background-color: var(--pico-color-indigo-50);
  border-radius: 4px;
}

.button-group {
  margin-top: 1rem;
}

.log-container {
  padding: 1rem;
  margin-top: 1.5rem;
  background-color: var(--pico-muted-background);
  border-radius: var(--border-radius);
}

.log-container ul {
  padding-left: 1.2rem;
  margin-bottom: 0;
}
</style>
