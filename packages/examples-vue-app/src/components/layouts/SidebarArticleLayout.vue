<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const isSidebarOpen = ref(false)

onBeforeRouteUpdate(() => {
  isSidebarOpen.value = false
})

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="sidebar-article-layout">
    <button type="button" :aria-expanded="isSidebarOpen" @click="toggleSidebar"><span>Menu</span></button>
    <aside class="sidebar-article-layout__sidebar">
      <slot name="sidebar" />
    </aside>

    <div class="sidebar-article-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
/*
SidebarArticleLayout
+- #sidebar: fixed sidebar
|  +- article-sidebar-introduction
|  `- article-sidebar-menu
`- #default: article content
*/

.sidebar-article-layout {
  --article-layout-title-color: var(--app-color-brand);
  --article-layout-title-text-color: white;
  --article-layout-sidebar-width: 380px;
  --article-layout-sidebar-shadow: 0 2px 5px var(--app-surface-overlay);
  --article-heading-indent: 1em hanging;
  --article-layout-expander-width: 50px;
  --article-layout-expander-mark-width: 20px;
  --article-layout-expander-mark-spacing: 6px;

  position: relative;
  z-index: 0;
  width: 100%;
  min-height: 100vh;

  &::after {
    /* overlay */
    position: fixed;
    inset: var(--layout-header-height) 0 var(--layout-footer-height) 0;
    z-index: 1;
    display: none;
    content: '';
    background-color: var(--app-surface-overlay);
  }

  &:has(> button[aria-expanded='true'])::after {
    /* only show overlay if sidebar exists */
    display: block;
  }

  > button[aria-expanded] {
    /* expander button */
    position: fixed;
    top: calc(var(--layout-header-height) + var(--app-spacing-md));
    right: var(--app-spacing-md);
    z-index: calc(var(--layout-z-index) + 1);
    display: block;
    width: var(--article-layout-expander-width);
    height: var(--article-layout-expander-width);
    font-size: 0;
    color: var(--app-color-on-accent);
    cursor: pointer;
    background-color: var(--app-color-accent);
    border: 0;
    border-radius: var(--app-radius-full);
    box-shadow: var(--article-layout-sidebar-shadow);

    & > span,
    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--article-layout-expander-mark-width);
      height: 2px;
      content: '';
      background-color: var(--app-color-on-accent);
      border-radius: 2px;
      transform: translate(-50%, -50%);
      transition:
        transform 0.3s ease,
        opacity 0.2s ease;
    }

    &::before {
      top: calc(50% - var(--article-layout-expander-mark-spacing));
    }

    &::after {
      top: calc(50% + var(--article-layout-expander-mark-spacing));
    }
  }

  > button[aria-expanded='true'] {
    &::before {
      top: 50%;
      transform: translateX(-50%) rotate(45deg);
    }

    & > span {
      opacity: 0;
    }

    &::after {
      top: 50%;
      transform: translateX(-50%) rotate(-45deg);
    }
  }

  .sidebar-article-layout__sidebar {
    position: fixed;
    top: var(--layout-header-height);
    bottom: auto;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: var(--app-spacing-md);
    width: 100%;
    max-height: 0;
    padding: var(--app-spacing-xs);
    overflow: hidden;
    color: var(--app-color-text);
    background-color: var(--app-surface-ground);
    border-right: 0;
    box-shadow: var(--article-layout-sidebar-shadow);
    opacity: 0;
    transform: translateY(-12px);
    transition:
      max-height 0.3s ease-in,
      opacity 0.1s ease-in 0.2s,
      transform 0.3s ease-in;
  }

  > button[aria-expanded='true'] {
    & + .sidebar-article-layout__sidebar {
      max-height: 100vh;
      opacity: 1;
      transform: translateY(0);
      transition:
        max-height 0.4s ease-out,
        opacity 0.3s ease-out,
        transform 0.4s ease-out;
    }
  }

  .sidebar-article-layout__content {
    padding-left: 0;
  }

  :deep(.article-sidebar-introduction),
  :deep(.article-sidebar-menu) {
    overflow: hidden;
    color: var(--app-color-text);
    background-color: var(--app-surface-section);
    border: solid 1px var(--app-surface-border);
    border-radius: var(--app-radius-md);
  }

  :deep(.article-sidebar-introduction) {
    flex: none;

    .article-sidebar-introduction__title {
      padding: var(--app-spacing-sm);
      font-size: var(--app-text-base);
      font-weight: var(--app-weight-bold);
      line-height: var(--app-leading-tight);
      color: var(--article-layout-title-text-color);
      background-color: var(--article-layout-title-color);
      border-radius: var(--app-radius-md) var(--app-radius-md) 0 0;
    }

    .article-sidebar-introduction__description {
      padding: var(--app-spacing-sm);
      font-size: var(--app-text-sm);
    }
  }

  :deep(.article-sidebar-menu) {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 70vh;
    padding: var(--app-spacing-sm);
    overflow: hidden;

    nav {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      gap: var(--app-spacing-md);
      min-height: 0;
      overflow-y: auto;

      > * {
        flex-shrink: 0;
      }
    }

    .article-menu-section {
      padding: var(--app-spacing-sm);
      background-color: var(--app-surface-card);
      border: solid 1px var(--app-surface-border);
      border-radius: var(--app-radius-md);

      > header {
        border-bottom: solid 1px var(--app-surface-border);
      }

      .article-menu-section__title {
        padding: var(--app-spacing-sm);
        font-size: var(--app-text-sm);
        font-weight: var(--app-weight-bold);
        line-height: var(--app-leading-tight);
        color: var(--app-color-text);
        text-indent: var(--article-heading-indent);
      }
    }

    nav {
      ul {
        display: flex;
        flex-direction: column;
        gap: var(--app-spacing-sm);
        padding-inline-start: 1em;
        font-size: var(--app-text-sm);
        list-style: none;
      }

      li {
        flex: 1 1 auto;
        border-bottom: 1px dotted var(--app-surface-border);

        a {
          display: block;
          padding: var(--app-spacing-sm) var(--app-spacing-xs);
          line-height: var(--app-leading-tight);
          text-indent: var(--article-heading-indent);
        }
      }
    }
  }

  @media (width >= 768px) {
    &:has(> button[aria-expanded='true'])::after {
      display: none;
    }

    > button[aria-expanded] {
      display: none;
    }

    .sidebar-article-layout__sidebar {
      bottom: 0;
      width: var(--article-layout-sidebar-width);
      max-height: none;
      padding: var(--app-spacing-md) var(--app-spacing-sm);
      border-right: solid 1px var(--app-surface-border);
      box-shadow: none;
      opacity: 1;
      transform: none;
      transition: none;
    }

    .sidebar-article-layout__content {
      padding-left: var(--article-layout-sidebar-width);
    }
  }
}
</style>
