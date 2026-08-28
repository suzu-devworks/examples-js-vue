<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    prevPage(): number {
      return Number(this.$route.params.page) - 1
    },
    nextPage(): number {
      return Number(this.$route.params.page) + 1
    },
  },
})
</script>

<template>
  <div class="sd-step2-pagination sd-card">
    <h3>Step 2-2: Pagination using RouterLink</h3>
    <p>Current page: {{ $route.params.page }}</p>

    <div class="container">
      <RouterLink :to="`/pagination/pages/${prevPage}`">Prev</RouterLink>
      |
      <RouterLink :to="`/pagination/pages/${nextPage}`">Next</RouterLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sd-step2-pagination {
  .container {
    display: flex;
    gap: var(--app-spacing-xs);
    align-items: center;
  }
}
</style>
