<script setup lang="ts">
import { useInbox } from '~/composables/wireframes/useInbox'

const { links } = useInbox()

const drawer = ref(null)
</script>

<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet class="profile-sheet p-4">
        <v-avatar class="profile-avatar mb-4" size="64" />

        <div>john@google.com</div>
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link :prepend-icon="icon" :title="text" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped lang="css">
.v-theme--light {
  :deep(.profile-sheet) {
    background-color: var(--color-neutral-100);
  }

  :deep(.profile-avatar) {
    background-color: var(--color-neutral-500);
  }
}

.v-theme--dark {
  :deep(.profile-sheet) {
    background-color: var(--color-neutral-800);
  }

  :deep(.profile-avatar) {
    background-color: var(--color-neutral-400);
  }
}
</style>
