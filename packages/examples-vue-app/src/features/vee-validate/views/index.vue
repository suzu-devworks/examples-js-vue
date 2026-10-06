<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import SidebarArticleLayout from '@/components/layouts/SidebarArticleLayout.vue'
import GroupingMenu from '@/components/ui/GroupingMenu.vue'
import { features } from '@/features'
import type { IMenu } from '@/types'

const activeMenu = features.find((menu) => menu.to === '/vee-validate')

const menu: IMenu = {
  title: `${activeMenu?.title}`,
  description: `${activeMenu?.description}`,
  groups: [
    {
      title: 'vee-validate (official)',
      items: [{ link: 'https://vee-validate.logaretm.com/v4/', title: 'Documentation' }],
    },
    {
      title: 'Schema validation',
      items: [
        { to: '/vee-validate/zod', title: 'zod' },
        { to: '/vee-validate/yup', title: 'yup' },
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
