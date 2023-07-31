<script setup lang="ts">
// https://nuxt.com/docs/getting-started/views

const route = useRoute()
const id = computed(() => Number(route.params.id || 1))
const prev = computed(() => "/transitions/numbers/" + (id.value - 1))
const next = computed(() => "/transitions/numbers/" + (id.value + 1))
</script>

<template>
  <div class="view">
    <AppHeader />

    <main>
      <slot />
      <div v-if="$route.params.id">
        <NuxtLink :to="prev">⬅️</NuxtLink> |
        <NuxtLink :to="next">➡️</NuxtLink>
      </div>
      <div>
        <NuxtLink to="/">Home page</NuxtLink>
      </div>
    </main>

    <AppFooter>
      <span>dynaic layout</span>
    </AppFooter>
  </div>
</template>

<style lang="scss" scoped>
.view {
  background-color: #90ee90;
  min-height: 100vh;

  & > main {
    padding-top: 2rem;
  }
}
</style>
