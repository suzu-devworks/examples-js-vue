<script setup lang="ts">
import { useRoute } from '#imports'

const route = useRoute()
</script>

<template>
  <article>
    <header>
      <h2>⚡ Step 2: Rendering Verification: SPA (ssr: false)</h2>
    </header>

    <p>
      <strong>URL Path:</strong> <code>{{ route.path }}</code>
    </p>
    <p>
      The server returns an empty HTML container. The entire UI is constructed inside the browser via client-side
      JavaScript.
    </p>
    <p>It becomes immediately clear if you "view the page source".</p>
  </article>
</template>
