<script setup lang="ts">
import { useMenu } from '../../composables/wireframes/useMenu'

const { menuItems } = useMenu()
</script>

<template>
  <v-app id="inspire" class="wireframes">
    <v-system-bar>
      <v-spacer />

      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer color="grey-lighten-3" expand-on-hover permanent rail>
      <v-list class="bg-transparent">
        <v-list-item class="px-[10px]" subtitle="xxxxx@gmail.com" title="XXXXX XXXXX">
          <template #prepend>
            <v-avatar color="grey-darken-1" :size="36" />
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="mx-3 my-2" />

      <v-list class="bg-transparent" density="compact" nav>
        <v-list-item v-for="link in menuItems" :key="link.to" link v-bind="link" />
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer width="244">
      <v-sheet color="grey-lighten-5" height="128" width="100%" />

      <v-list>
        <v-list-item v-for="n in 5" :key="n" link :title="`Item ${n}`" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="px-3" color="grey-lighten-4" flat height="72">
      <v-spacer />

      <v-responsive max-width="156">
        <v-text-field
          bg-color="grey-lighten-1"
          density="compact"
          flat
          hide-details
          rounded="pill"
          variant="solo-filled"
        />
      </v-responsive>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item v-for="n in 5" :key="n" link :title="`Item ${n}`" />
      </v-list>
    </v-navigation-drawer>

    <v-footer app height="72">
      <v-text-field
        bg-color="grey-lighten-1"
        class="overflow-hidden"
        density="compact"
        flat
        hide-details
        rounded="pill"
        variant="solo-filled"
      />
    </v-footer>
  </v-app>
</template>
