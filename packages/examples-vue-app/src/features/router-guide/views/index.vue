<script setup lang="ts">
import { useRoute } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import SidebarArticleLayout from '@/components/layouts/SidebarArticleLayout.vue'
import GroupingMenu from '@/components/ui/GroupingMenu.vue'
import { features } from '@/features'
import type { IMenu } from '@/types'

const route = useRoute()
const activeMenu = features.find((menu) => route.path.startsWith(menu.to))

const menu: IMenu = {
  title: `${activeMenu?.title}`,
  description: `${activeMenu?.description}`,
  groups: [
    {
      title: 'Vue Router Guide (official)',
      items: [
        {
          link: 'https://router.vuejs.org/guide/',
          title: 'Getting Started',
        },
      ],
    },
    {
      title: 'Advanced',
      items: [
        {
          to: '/router/guide/advanced/navigation-guards',
          title: 'Navigation Guards',
        },
      ],
    },
  ],
}
</script>

<template>
  <DefaultLayout>
    <SidebarArticleLayout>
      <template #sidebar>
        <header class="article-sidebar-introduction">
          <div class="article-sidebar-introduction__title">{{ menu.title }}</div>
          <p class="article-sidebar-introduction__description">{{ menu.description }}</p>
        </header>

        <div class="article-sidebar-menu">
          <nav>
            <GroupingMenu :groups="menu.groups" />
          </nav>
        </div>
      </template>

      <RouterView />
    </SidebarArticleLayout>
  </DefaultLayout>
</template>
