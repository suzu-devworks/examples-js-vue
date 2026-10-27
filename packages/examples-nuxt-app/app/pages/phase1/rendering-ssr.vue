<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()
</script>

<template>
  <article>
    <header>
      <h2>🌐 Step 2: Rendering Verification: SSR (ssr: true)</h2>
    </header>

    <p>
      <strong>URL Path:</strong> <code>{{ route.path }}</code>
    </p>
    <p>This page is fully assembled into HTML on the server-side before being dispatched to the browser.</p>
    <p>It becomes immediately clear if you "view the page source".</p>
  </article>
</template>
