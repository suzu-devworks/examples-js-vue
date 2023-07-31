<script setup lang="ts">
// https://nuxt.com/docs/getting-started/views

import { menus } from "@/assets/menus"
</script>

<template>
  <div class="view">
    <AppHeader />

    <AppDrawer class="drawer">
      <AppNavi :menus="menus" />
    </AppDrawer>
    <main>
      <slot />
    </main>

    <AppFooter>
      <span>default layout</span>
    </AppFooter>
  </div>
</template>

<style lang="scss" scoped>
/* .drawer */
$drawer-width: 300px;

.view {
  min-height: 100vh;

  & > main {
    padding-top: 2rem;
  }
}

.view .drawer {
  padding-top: 2rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: $drawer-width;
  height: 100vh;
  transform: translateX(0);
}

.view > main {
  margin-left: $drawer-width;
}
</style>
