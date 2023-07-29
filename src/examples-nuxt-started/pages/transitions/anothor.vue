<script setup lang="ts">
// https://nuxt.com/docs/getting-started/transitions
definePageMeta({
  layout: "orange",
  pageTransition: {
    name: "rotate",
  },
})
</script>

<template>
  <div>
    <h1>Transitions</h1>
    <h2>Layout Transition</h2>
    <p>
      Nuxt leverages Vue's &lt;Transition&gt; component to apply transitions between pages and
      layouts.
    </p>
  </div>
</template>
