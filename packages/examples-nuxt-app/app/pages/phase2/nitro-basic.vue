<script setup lang="ts">
import { useFetch } from 'nuxt/app'

const { data: apiData, error } = await useFetch('/api/phase2/hello', {
  query: { name: 'Nuxt4_App_Context' },
})
</script>

<template>
  <article>
    <header>
      <h2>Step 4: Nitro Server API Basics & Direct URL Verification</h2>
    </header>

    <section>
      <h3 class="menu-header">🌐 Experiment 1: Direct URL Access (direct browser access)</h3>
      <p>
        Nitro endpoints exist independently of the Vue frontend. You can access the server API directly via a standard
        browser request.
      </p>

      <div class="test-link-box">
        <p class="test-title"><strong>🧪 Test Direct API Access (Click to open raw JSON):</strong></p>
        <div class="link-grid">
          <!-- A pure href link to let the raw API hit the browser, completely as an external tab. -->
          <a href="/api/phase2/hello" target="_blank" role="button" class="outline secondary lab-btn">
            🔍 Open Raw API Output
          </a>
          <a
            href="/api/phase2/hello?name=Direct_Browser_Hit"
            target="_blank"
            role="button"
            class="outline secondary lab-btn"
          >
            🧪 Open with Query (?name=...)
          </a>
        </div>
      </div>

      <p>
        <small>
          <b>💡 What to observe:</b> When you click the links above, you will leave the Vue application interface. The
          browser will render pure JSON data directly from the Nitro engine. Notice that
          <code>serverTimeNormalized</code> updates on every single refresh.
        </small>
      </p>
    </section>

    <footer>
      <h3 class="menu-header">🔍 Experiment 2: Internal Hydration via useFetch</h3>

      <div v-if="error" class="error-message">❌ API Connection Error: {{ error.message }}</div>

      <div v-else-if="apiData">
        <p>
          The same endpoint is consumed below by the Vue component during rendering. Notice how the query parameter
          defined in <code>&lt;script setup&gt;</code> is beautifully bound.
        </p>
        <pre><code>{{ JSON.stringify(apiData, null, 2) }}</code></pre>
      </div>

      <div v-else>⏳ Fetching data from Nitro...</div>
    </footer>
  </article>
</template>

<!-- 💡 インラインスタイルをすべてこちらに集約（Pico.css の変数と調和させます） -->
<style scoped>
.test-link-box {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px dashed var(--pico-muted-border-color);
  border-radius: var(--pico-border-radius);
}

.link-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  a:hover {
    background-color: color-mix(in oklab, var(--pico-primary-hover-background) 10%, transparent);
  }
}

.lab-btn {
  font-size: 0.9rem;
}

.error-message {
  color: var(--pico-form-element-invalid-border-color);
}
</style>
