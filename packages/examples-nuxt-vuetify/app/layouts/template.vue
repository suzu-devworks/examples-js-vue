<template>
  <v-app>
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
