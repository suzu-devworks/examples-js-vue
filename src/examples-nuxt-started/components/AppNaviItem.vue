<script setup lang="ts">
// https://nuxt.com/docs/getting-started/routing

export interface NaviItemPorps {
  title: string
  caption?: string
  link?: string
  icon?: string
  children?: NaviItemPorps[]
}

withDefaults(defineProps<NaviItemPorps>(), {
  caption: "",
  link: "#",
  icon: "",
  children: () => [],
})
</script>

<template>
  <li class="menu-item">
    <template v-if="children.length > 0">
      <a>{{ title }}</a>
      <ul>
        <AppNaviItem v-for="(submenu, index) in children" :key="index" v-bind="submenu" />
      </ul>
    </template>
    <NuxtLink v-else :to="link">
      <span class="title">{{ title }}</span>
      <span v-if="caption" class="caption">{{ caption }}</span>
    </NuxtLink>
  </li>
</template>
