<script setup lang="ts">
const menuItems = [
  { to: '/', title: 'Home', prependIcon: 'mdi-home' },
  { to: '/wireframes', title: 'Wireframes', prependIcon: 'mdi-responsive' },
]

const { mdAndUp } = useDisplay()
const drawer = ref(mdAndUp)
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>examples-vue-vuetify</v-app-bar-title>

      <v-btn class="m-2" icon="mdi-theme-light-dark" @click="$vuetify.theme.cycle()" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list density="compact" nav>
        <v-list-subheader>MENU</v-list-subheader>
        <v-list-item v-for="link in menuItems" :key="link.to" link v-bind="link" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <NuxtPage />
    </v-main>

    <v-btn
      class="m-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app>
</template>
