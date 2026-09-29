<script setup lang="ts">
import { useGlobalDialog, useGlobalToast } from 'examples-vue-shared'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import SidebarArticleLayout from '@/components/layouts/SidebarArticleLayout.vue'
import { features } from '@/features'
import type { IMenu } from '@/types'

import GlobalDialog from '../components/GlobalDialog.vue'
import GlobalToast from '../components/GlobalToast.vue'

const { openDialog } = useGlobalDialog()
const { toast } = useGlobalToast()
const route = useRoute()
const activeFeature = features.find((feature) => route.path.startsWith(feature.to))

const menu: IMenu = {
  title: `${activeFeature?.title}`,
  description: `${activeFeature?.description}`,
  groups: [
    {
      title: 'On this page',
      items: [
        { to: '#global-dialog', title: 'Global Dialog' },
        { to: '#global-toast', title: 'Global Toast' },
      ],
    },
  ],
}

async function handleAction() {
  const confirmed = await openDialog({
    title: 'Confirm action',
    text: 'Do you want to perform this operation?',
  })

  if (confirmed) {
    toast.success('Operation completed.')
  }
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
          <nav aria-label="Interactions sections">
            <section v-for="group in menu.groups" :key="group.title" class="article-menu-section">
              <header>
                <div class="article-menu-section__title">{{ group.title }}</div>
              </header>
              <ul>
                <li v-for="item in group.items" :key="item.to">
                  <a :href="item.to">{{ item.title }}</a>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </template>

      <main class="article-page">
        <header>
          <h1>Interactions</h1>
          <p>Global dialogs and toasts powered by the same library used in Nuxt.</p>
        </header>

        <section id="global-dialog" class="article-section" aria-labelledby="dialog-heading">
          <div>
            <h2 id="dialog-heading">Global Dialog</h2>
            <p>Resolve an asynchronous confirmation from the shared dialog composable.</p>
          </div>
          <button class="button-primary" type="button" @click="handleAction">Open dialog</button>
        </section>

        <section id="global-toast" class="article-section" aria-labelledby="toast-heading">
          <div>
            <h2 id="toast-heading">Global Toast</h2>
            <p>Publish messages to the shared toast queue.</p>
          </div>
          <div class="button-group">
            <button
              class="toast-button toast-button--success"
              type="button"
              @click="toast.success('Operation completed.')"
            >
              Success
            </button>
            <button
              class="toast-button toast-button--info"
              type="button"
              @click="toast.info('Here is some information.')"
            >
              Info
            </button>
            <button
              class="toast-button toast-button--warning"
              type="button"
              @click="toast.warning('Please check this.')"
            >
              Warning
            </button>
            <button
              class="toast-button toast-button--error"
              type="button"
              @click="toast.error('Something went wrong.')"
            >
              Error
            </button>
          </div>
        </section>
      </main>

      <GlobalDialog />
      <GlobalToast />
    </SidebarArticleLayout>
  </DefaultLayout>
</template>

<style lang="css" scoped>
.toast-button--success {
  color: var(--app-color-on-success);
  background-color: var(--app-color-success);
  border-color: var(--app-color-success);
}

.toast-button--info {
  color: var(--app-color-on-info);
  background-color: var(--app-color-info);
  border-color: var(--app-color-info);
}

.toast-button--warning {
  color: var(--app-color-on-warning);
  background-color: var(--app-color-warning);
  border-color: var(--app-color-warning);
}

.toast-button--error {
  color: var(--app-color-on-error);
  background-color: var(--app-color-error);
  border-color: var(--app-color-error);
}
</style>
