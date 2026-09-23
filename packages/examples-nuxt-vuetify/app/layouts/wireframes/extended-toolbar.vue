<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-nav-icon />

      <v-app-bar-title>Application</v-app-bar-title>

      <v-btn icon="mdi-dots-vertical" />
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
