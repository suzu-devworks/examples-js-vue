<script setup lang="ts">
const links = ['Dashboard', 'Messages', 'Profile', 'Updates']
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-avatar class="md:hidden" color="grey-darken-1" size="32" />

      <v-spacer />

      <v-tabs align-tabs="center" color="grey-darken-2">
        <v-tab v-for="link in links" :key="link" :text="link" />
      </v-tabs>

      <v-spacer />

      <v-avatar class="max-sm:hidden" color="grey-darken-1" size="32" />
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <slot />
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
.v-theme--light {
  :deep(.bg-grey-darken-1) {
    background-color: var(--color-neutral-100);
  }

  :deep(.bg-grey-darken-2) {
    background-color: var(--color-neutral-500);
  }
}

.v-theme--dark {
  :deep(.bg-grey-darken-1) {
    background-color: var(--color-neutral-100);
  }

  :deep(.bg-grey-darken-2) {
    background-color: var(--color-neutral-400);
  }
}
</style>
