<script lang="ts">
import { defineComponent } from "vue"
// @ is an alias to /src
import { useGlobalProfileStore } from "@/stores/software-design/global-profile"
import { mapStores } from "pinia"

export default defineComponent({
  computed: {
    // each store will be accessible as its id + 'Store'
    ...mapStores(useGlobalProfileStore),

    profile(): object {
      return this.globalProfileStore.profile ?? {}
    },
  },
  mounted() {
    this.globalProfileStore.fetchGithubProfile({ user_id: "octcat" })
  },
})
</script>

<template>
  <div class="profile">
    <h1>This is github progile page</h1>
    <p>{{ profile }}</p>
  </div>
</template>
