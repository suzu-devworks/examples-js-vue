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
      title: 'Vue Guide (official)',
      items: [
        {
          link: 'https://ja.vuejs.org/guide/quick-start.html',
          title: 'Quick Start',
        },
      ],
    },
    {
      title: 'Components In-Depth',
      items: [
        {
          to: '/vue/components/registration',
          title: 'Registration',
        },
        {
          to: '/vue/components/props',
          title: 'Props',
        },
        {
          to: '/vue/components/events',
          title: 'Events',
        },
        {
          to: '/vue/components/v-models',
          title: 'Component v-model',
        },
        {
          to: '/vue/components/fallthrough',
          title: 'Fallthrough Attributes',
        },
        {
          to: '/vue/components/slots',
          title: 'Slots',
        },
        {
          to: '/vue/components/provide-inject',
          title: 'Provide / Inject',
        },
        {
          title: 'Async Components',
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
