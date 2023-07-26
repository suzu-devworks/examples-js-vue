<script setup lang="ts">
const route = useRoute()
const id = computed(() => Number(route.params.id || 1))
const prev = computed(() => "/transitions/numbers/" + (id.value - 1))
const next = computed(() => "/transitions/numbers/" + (id.value + 1))
</script>

<template>
  <div class="container">
    <pre>dynaic layout</pre>
    <slot />
    <div v-if="$route.params.id">
      <NuxtLink :to="prev">⬅️</NuxtLink> |
      <NuxtLink :to="next">➡️</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/">Home page</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: lightgreen;
  padding: 20px;
  height: 100vh;
}
</style>
