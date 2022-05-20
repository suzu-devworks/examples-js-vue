<template>
  <div class="profile">
    <h1>This is github progile page</h1>
    <p>{{ profile }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  mounted(){
    this.$store.dispatch("fetchGithubProfile", { user_id: "octcat"})
  },
  computed: {
    ...mapState(["profile"])
  }
}
</script>
