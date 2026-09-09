<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import { useGlobalProfileStore } from '../stores/global-profile'

export default defineComponent({
  computed: {
    // each store will be accessible as its id + 'Store'
    ...mapStores(useGlobalProfileStore),

    profile(): object {
      return this.globalProfileStore.profile ?? {}
    },
  },
  mounted() {
    this.globalProfileStore.fetchGithubProfile({ user_id: 'octcat' })
  },
})
</script>

<template>
  <div class="sd-step3-profile article-example">
    <h3>Step 3-2: Example of Fetch component with store</h3>

    <div v-if="globalProfileStore.loading" class="sd-step3-profile-loading">
      <p>Loading...</p>
    </div>
    <div v-if="globalProfileStore.error" class="sd-step3-profile-error">
      <p>Error: {{ globalProfileStore.error }}</p>
    </div>
    <p v-if="!globalProfileStore.loading && !globalProfileStore.error">GitHub profile data fetched successfully!</p>
    <p>{{ profile }}</p>
  </div>
</template>
