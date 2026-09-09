<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import SidebarArticleLayout from '@/components/layouts/SidebarArticleLayout.vue'
import type { IMenu } from '@/types'

const menu: IMenu = {
  title: 'Vite guide',
  description: 'This content is based on the documentation from the official Vite website.',
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
            <template v-for="(group, index) in menu.groups" :key="index">
              <section class="article-menu-section">
                <header>
                  <div class="article-menu-section__title">{{ group.title }}</div>
                </header>
                <ul>
                  <li v-for="(item, itemIndex) in group.items" :key="itemIndex" class="article-menu-item">
                    <RouterLink v-if="item.to" :to="item.to" class="open-in-router-view">{{ item.title }}</RouterLink>
                    <a
                      v-else-if="item.link"
                      :href="item.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="open-in-new"
                      >{{ item.title }}</a
                    >
                    <span v-else class="static-label">{{ item.title }}</span>
                  </li>
                </ul>
              </section>
            </template>
          </nav>
        </div>
      </template>

      <RouterView />
    </SidebarArticleLayout>
  </DefaultLayout>
</template>
