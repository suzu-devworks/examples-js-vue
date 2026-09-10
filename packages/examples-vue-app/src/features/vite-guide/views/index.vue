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
      title: 'Vite Guide (official)',
      items: [
        {
          link: 'https://ja.vite.dev/guide/',
          title: 'Getting Started',
        },
      ],
    },
    {
      title: 'Guide',
      items: [
        {
          to: '/vite/guide/features',
          title: 'Features',
        },
        {
          to: '/vite/guide/env-and-mode',
          title: 'Env Variables and Modes',
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
