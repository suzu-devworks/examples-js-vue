<script setup lang="ts">
definePageMeta({
  layout: 'wireframes-three-column',
})

import { useMenu } from '../../composables/wireframes/useMenu'

const { menuItems } = useMenu()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <v-sheet min-height="268" rounded="lg">
          <v-list density="compact" nav>
            <v-list-subheader>WIREFRAMES MENU</v-list-subheader>
            <v-list-item v-for="link in menuItems" :key="link.to" link v-bind="link" />
          </v-list>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="8">
        <v-sheet class="p-4" min-height="70vh" rounded="lg">
          <h1>Three Column Wireframe</h1>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="2">
        <v-sheet min-height="268" rounded="lg" />
      </v-col>
    </v-row>
  </v-container>
</template>
