<script setup lang="ts">
const links = ['Dashboard', 'Messages', 'Profile', 'Updates']
</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto flex items-center content-center">
        <v-avatar class="mx-4 profile-avatar" size="32" />

        <v-btn v-for="link in links" :key="link" :text="link" variant="text" />

        <v-spacer />

        <v-responsive max-width="160">
          <v-text-field
            density="compact"
            flat
            hide-details
            label="Search"
            rounded="lg"
            single-line
            variant="solo-filled"
          />
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="profile-main">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped lang="css">
.v-theme--light {
  :deep(.profile-sheet) {
    background-color: var(--color-neutral-100);
  }

  :deep(.profile-main) {
    background-color: var(--color-neutral-200);
  }

  :deep(.profile-avatar) {
    background-color: var(--color-neutral-500);
  }
}

.v-theme--dark {
  :deep(.profile-sheet) {
    background-color: var(--color-neutral-800);
  }

  :deep(.profile-main) {
    background-color: var(--color-neutral-700);
  }

  :deep(.profile-avatar) {
    background-color: var(--color-neutral-400);
  }
}
</style>
