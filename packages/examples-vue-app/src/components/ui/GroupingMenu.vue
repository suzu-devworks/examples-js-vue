<script setup lang="ts">
import type { IMenuGroup } from '@/types'

defineProps<{
  groups: IMenuGroup[]
}>()
</script>

<template>
  <div v-for="(group, index) in groups" :key="index">
    <section class="article-menu-section">
      <header>
        <div class="article-menu-section__title">{{ group.title }}</div>
      </header>
      <ul>
        <li v-for="(item, itemIndex) in group.items" :key="itemIndex" class="article-menu-item">
          <RouterLink v-if="item.to" :to="item.to" class="open-in-router-view">{{ item.title }}</RouterLink>
          <a v-else-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer" class="open-in-new">{{
            item.title
          }}</a>
          <span v-else class="static-label">{{ item.title }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
