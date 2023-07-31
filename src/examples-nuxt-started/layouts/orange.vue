<script setup lang="ts">
// https://nuxt.com/docs/getting-started/views
</script>

<template>
  <div class="view">
    <AppHeader />

    <main>
      <slot />
    </main>
    <aside>
      <div>
        <NuxtLink to="/">Home page</NuxtLink>
      </div>
    </aside>

    <AppFooter>
      <span>orange layout</span>
    </AppFooter>
  </div>
</template>

<style lang="scss" scoped>
.view {
  background-color: orange;
  min-height: 100vh;

  & > main {
    padding-top: 2rem;
  }
}
</style>
