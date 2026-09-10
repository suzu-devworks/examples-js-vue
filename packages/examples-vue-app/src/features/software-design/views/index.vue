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
      title: '[Step-by-Step] Vue.js Course Understand the Trends in JavaScript Frameworks - 2020-09',
      items: [
        {
          to: '/software-design/2020-09/step1',
          title: 'Step 1: Experience reactive data binding',
        },
        {
          to: '/software-design/2020-09/step2',
          title: 'Step 2: Learn the basics of componentization and page navigation to build an SPA',
        },
        {
          to: '/software-design/2020-09/step3',
          title: 'Step 3: Address issues arising from component splitting',
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
