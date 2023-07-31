<script setup lang="ts">
import { NaviItemPorps } from "./AppNaviItem.vue"

export interface NaviPorps {
  menus: NaviItemPorps[]
}

withDefaults(defineProps<NaviPorps>(), {
  menus: () => [],
})
</script>

<template>
  <nav>
    <ul>
      <AppNaviItem v-for="(menu, index) in menus" :key="index" v-bind="menu" />
    </ul>
  </nav>
</template>
