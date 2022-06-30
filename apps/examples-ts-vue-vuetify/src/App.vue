<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTheme, useDisplay } from "vuetify";

const theme = useTheme();
const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "dark");

onMounted(() => {
  const { name, mobileBreakpoint } = useDisplay();
  console.log(`${name},${mobileBreakpoint}`);
});

const drawer = ref(true);
const menus = [
  {
    title: "Home",
    path: "/",
    icon: "mdi-home",
  },
  {
    title: "About",
    path: "/about",
    icon: "mdi-flag",
  },
];
</script>

<template>
  <v-app>
    <v-layout :theme="theme">
      <v-app-bar color="primary" app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Vuetify example</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn size="small" variant="outlined" @click="toggleTheme">
          <v-icon>mdi-theme-light-dark</v-icon>
          <span class="d-none d-md-inline">toggle theme</span>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer">
        <v-list density="compact" nav>
          <v-list-item
            v-for="item in menus"
            :key="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.path"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main app>
        <router-view />
      </v-main>

      <v-footer color="primary" app>footer</v-footer>
    </v-layout>
  </v-app>
</template>
