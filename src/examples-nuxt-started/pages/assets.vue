<script setup lang="ts">
// https://nuxt.com/docs/getting-started/assets
</script>

<template>
  <div>
    <h1>Assets</h1>
    <p>Nuxt uses two directories to handle assets like stylesheets, fonts or images.</p>
    <section>
      <h2>The public/ directory</h2>
      <img src="/img/full-logo-green-dark.png" alt="Discover Nuxt 3" />
    </section>
    <section>
      <h2>The assets/ directory</h2>
      <img src="~/assets/img/full-logo-black.png" alt="Discover Nuxt 3" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
section h2 {
  color: $primary;
}
</style>
