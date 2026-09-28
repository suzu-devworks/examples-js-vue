<script setup lang="ts">
import { useMenu } from '../../composables/wireframes/useMenu'

const { menuItems } = useMenu()
</script>

<template>
  <v-app id="inspire" class="wireframes">
    <v-navigation-drawer color="grey-lighten-3" expand-on-hover permanent rail>
      <v-list>
        <v-list-item class="pl-3" subtitle="xxxxx@gmail.com" title="XXXXX XXXXX">
          <template #prepend>
            <v-avatar color="grey-darken-1" :size="36" />
          </template>
        </v-list-item>
      </v-list>

      <v-list density="compact" nav>
        <v-list-item v-for="link in menuItems" :key="link.to" link v-bind="link" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
