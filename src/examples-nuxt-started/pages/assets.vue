<script setup lang="ts">
// https://nuxt.com/docs/getting-started/assets
</script>

<template>
  <div>
    <h1>Assets</h1>
    <p>Nuxt uses two directories to handle assets like stylesheets, fonts or images.</p>

    <section>
      <h2>The <code>public/</code> directory</h2>
      <p>
        The <code>public/</code> directory stores static files that you serve directly at the root
        of your server.
      </p>
      <img src="/img/full-logo-green-dark.png" alt="Discover Nuxt 3" />
    </section>
    <section>
      <h2>The <code>assets/</code> directory</h2>
      <p>The <code>assets/</code> directory stores static files for builds and bundles.</p>
      <img src="~/assets/img/full-logo-black.png" alt="Discover Nuxt 3" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
section h2 {
  color: $primary;
}
section h2 > code {
  font-size: 1.2em;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0 0.2em;
  color: $primary;
}
</style>
