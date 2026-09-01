<template>
  <div class="sidebar-article-layout">
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
  --article-heading-indent: 1em hanging;

  position: relative;
  z-index: 0;
  width: 100%;
  min-height: 100vh;

  &::after {
    position: fixed;
    inset: var(--layout-header-height) 0 var(--layout-footer-height) 0;
    z-index: 1;
    display: none;
    content: '';
    background-color: var(--app-surface-overlay);
  }

  .sidebar-article-layout__sidebar {
    position: fixed;
    top: var(--layout-header-height);
    bottom: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: var(--app-spacing-md);
    width: var(--article-layout-sidebar-width);
    padding: var(--app-spacing-md) var(--app-spacing-sm);
    overflow: hidden;
    color: var(--app-color-text);
    background-color: var(--app-surface-ground);
    border-right: solid 1px var(--app-surface-border);
  }

  .sidebar-article-layout__content {
    padding-left: var(--article-layout-sidebar-width);
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
    min-height: 0;
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
}
</style>
