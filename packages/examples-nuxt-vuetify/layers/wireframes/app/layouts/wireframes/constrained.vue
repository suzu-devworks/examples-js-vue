<script setup lang="ts">
import { useGlidingNavigation } from '../../composables/wireframes/useGlidingNavigation'
import { useMenu } from '../../composables/wireframes/useMenu'

const { menuItems } = useMenu()

const links = ['Dashboard', 'Messages', 'Profile', 'Updates']

const { menu, activator, menuMoving, activate, onListEnter, delayedClose } = useGlidingNavigation()
</script>

<template>
  <v-app id="inspire" class="wireframes">
    <v-app-bar flat>
      <v-container class="mx-auto flex items-center content-center">
        <v-avatar class="me-4" color="grey-darken-1" size="32" />

        <v-btn v-for="link in links" :key="link" :text="link" variant="text" />

        <v-btn
          append-icon="mdi-chevron-down"
          text="Wireframes"
          @focus="activate($event)"
          @mouseenter="activate($event)"
          @mouseleave="delayedClose()"
        />

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

    <v-menu
      v-model="menu"
      :activator="activator"
      :content-class="{ 'menu-move-transition': menuMoving }"
      location="bottom end"
      offset="4"
      viewport-margin="0"
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="link in menuItems"
          :key="link.to"
          link
          v-bind="link"
          @mouseenter="onListEnter()"
          @mouseleave="delayedClose()"
        />
      </v-list>
    </v-menu>

    <v-main class="bg-grey-lighten-3">
      <slot />
    </v-main>
  </v-app>
</template>
