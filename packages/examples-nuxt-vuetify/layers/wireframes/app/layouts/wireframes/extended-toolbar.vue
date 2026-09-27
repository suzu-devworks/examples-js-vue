<script setup lang="ts">
import { useMenu } from '../../composables/wireframes/useMenu'

const { menuItems } = useMenu()

const { mdAndUp } = useDisplay()
const drawer = ref(mdAndUp)
</script>

<template>
  <v-app id="inspire" class="wireframes">
    <v-navigation-drawer v-model="drawer">
      <v-list density="compact" nav>
        <v-list-subheader>WIREFRAMES MENU</v-list-subheader>
        <v-list-item v-for="link in menuItems" :key="link.to" link v-bind="link" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar extended>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Application</v-app-bar-title>

      <v-btn icon="mdi-dots-vertical" />
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
