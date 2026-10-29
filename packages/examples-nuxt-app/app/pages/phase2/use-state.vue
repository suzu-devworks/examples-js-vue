<script setup lang="ts">
import { useSharedState } from '#imports'

// Obtain securely defined shared state
const state = useSharedState()

const increment = () => {
  state.value.count++
  state.value.lastUpdated = new Date().toLocaleTimeString()
}

const decrement = () => {
  state.value.count--
  state.value.lastUpdated = new Date().toLocaleTimeString()
}

const reset = () => {
  state.value.count = 0
  state.value.lastUpdated = new Date().toLocaleTimeString()
}
</script>

<template>
  <article>
    <header>
      <h2>Step 7: Safe Shared State with <code>useState</code></h2>
    </header>

    <section>
      <p>
        Manage shared state safely across SSR and the client. By initializing <code>useState</code> with a factory
        function (<code>() => ({ ... })</code>), we prevent cross-request state pollution on the server.
      </p>

      <div class="card">
        <h3>Current Shared State</h3>
        <ul>
          <li>
            <strong>Count:</strong> <span class="badge-count">{{ state.count }}</span>
          </li>
          <li><strong>Last Updated:</strong> {{ state.lastUpdated }}</li>
        </ul>

        <div class="grid button-group">
          <button @click="increment">Increment (+)</button>
          <button class="secondary outline" @click="decrement">Decrement (-)</button>
          <button class="contrast outline" @click="reset">Reset</button>
        </div>
      </div>

      <p class="notice">
        💡 Tip: If you navigate away to another page and come back, or if you synchronize this state with another
        component, the shared value is safely retained via Nuxt payload and hydration.
      </p>
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

.badge-count {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-weight: bold;
  color: var(--pico-color-azure-650);
  background-color: var(--pico-color-azure-50);
  border-radius: 4px;
}

.button-group {
  margin-top: 1rem;
}

.notice {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--ins-color);
}
</style>
