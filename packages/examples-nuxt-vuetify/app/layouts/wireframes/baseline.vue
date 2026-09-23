<script setup lang="ts">
import { useWireframesMenu } from '~/composables/wireframes/useWireframesMenu'

const { links } = useWireframesMenu()

const drawer = ref(false)
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.path"
          link
          :prepend-icon="link.icon"
          :title="link.title"
          :to="link.path"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
