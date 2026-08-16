<script lang="ts">
import { defineComponent } from "vue"

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
  <div class="paging">
    <h1>Page: {{ $route.params.page }}</h1>
    <RouterLink :to="`/paging/pages/${prevPage}`">Prev</RouterLink>
    |
    <RouterLink :to="`/paging/pages/${nextPage}`">Next</RouterLink>
  </div>
</template>
