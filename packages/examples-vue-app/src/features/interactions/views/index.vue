<script setup lang="ts">
import { useClipboard, useGlobalDialog, useGlobalLoading, useGlobalToast, useUnsavedChanges } from 'examples-vue-shared'
import { ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import SidebarArticleLayout from '@/components/layouts/SidebarArticleLayout.vue'
import { features } from '@/features'
import type { IMenu } from '@/types'

import GlobalDialog from '../components/GlobalDialog.vue'
import GlobalLoading from '../components/GlobalLoading.vue'
import GlobalToast from '../components/GlobalToast.vue'

const { openDialog } = useGlobalDialog()
const { toast } = useGlobalToast()
const { isLoading, withLoading } = useGlobalLoading()
const { copyText } = useClipboard()
const { isDirty, confirmLeave } = useUnsavedChanges(openDialog)
const route = useRoute()
const activeFeature = features.find((feature) => route.path.startsWith(feature.to))
const draft = ref('Edit this draft, then navigate to another page.')
const initialDraft = draft.value
const clipboardValue = 'Copied from the interactions example.'

watch(draft, (value) => {
  isDirty.value = value !== initialDraft
})

onBeforeRouteLeave(confirmLeave)

const menu: IMenu = {
  title: `${activeFeature?.title}`,
  description: `${activeFeature?.description}`,
  groups: [
    {
      title: 'On this page',
      items: [
        { to: '#global-dialog', title: 'Global Dialog' },
        { to: '#global-toast', title: 'Global Toast' },
        { to: '#global-loading', title: 'Global Loading' },
        { to: '#unsaved-changes', title: 'Unsaved Changes' },
        { to: '#clipboard', title: 'Clipboard' },
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

async function handleLoading() {
  await withLoading(() => new Promise((resolve) => setTimeout(resolve, 1200)))
  toast.success('Loading finished.')
}

async function handleCopy() {
  if (await copyText(clipboardValue)) {
    toast.success('Text copied to clipboard.')
  } else {
    toast.error('Clipboard access is unavailable.')
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
          <p>Shared interaction patterns for dialogs, notifications, loading, navigation, and clipboard access.</p>
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

        <section id="global-loading" class="article-section" aria-labelledby="loading-heading">
          <div>
            <h2 id="loading-heading">Global Loading</h2>
            <p>Show a shared loading overlay while an asynchronous operation is running.</p>
          </div>
          <button class="button-primary" type="button" :disabled="isLoading" @click="handleLoading">
            {{ isLoading ? 'Loading...' : 'Start loading' }}
          </button>
        </section>

        <section id="unsaved-changes" class="article-section" aria-labelledby="unsaved-heading">
          <div>
            <h2 id="unsaved-heading">Unsaved Changes</h2>
            <p>Try navigating away after editing this draft.</p>
          </div>
          <label for="draft">Draft</label>
          <textarea id="draft" v-model="draft" class="draft-input" rows="3" />
          <p aria-live="polite">{{ isDirty ? 'Unsaved changes' : 'No unsaved changes' }}</p>
        </section>

        <section id="clipboard" class="article-section" aria-labelledby="clipboard-heading">
          <div>
            <h2 id="clipboard-heading">Clipboard</h2>
            <p>Copy text and report whether the browser allowed the operation.</p>
          </div>
          <code>{{ clipboardValue }}</code>
          <button class="button-primary" type="button" @click="handleCopy">Copy text</button>
        </section>
      </main>

      <GlobalDialog />
      <GlobalLoading />
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

.draft-input {
  width: min(100%, 36rem);
  padding: var(--app-spacing-sm);
  font: inherit;
  color: var(--app-color-text);
  background-color: var(--app-surface-card);
  border: 1px solid var(--app-surface-border);
  border-radius: var(--app-radius-sm);
}
</style>
