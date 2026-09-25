<script setup lang="ts">
import { useInbox } from '../../composables/wireframes/useInbox'
import { useMenu } from '../../composables/wireframes/useMenu'

const { menuItems } = useMenu()
const { links } = useInbox()

const drawer = ref(null)
</script>

<template>
  <v-app id="inspire" class="wireframes">
    <v-system-bar>
      <v-spacer />

      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet class="p-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64" />

        <div>john@google.com</div>
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link :prepend-icon="icon" :title="text" />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-subheader>WIREFRAMES MENU</v-list-subheader>
        <v-list-item v-for="link in menuItems" :key="link.to" link v-bind="link" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
