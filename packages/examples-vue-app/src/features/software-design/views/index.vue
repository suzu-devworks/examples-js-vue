<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout class="sd-view">
    <div class="sd-view-main">
      <aside class="sd-view-left">
        <header>
          <div class="sd-view-title">Articles of Software Design</div>
          <p>This content is based on the feature article from the Software Design.</p>
        </header>

        <div class="sd-view-menu">
          <nav>
            <section>
              <header>
                <div class="title">2020-09 Feature 1</div>
              </header>
              <p>[Step-by-Step] Vue.js Course Understand the Trends in JavaScript Frameworks</p>
              <ul>
                <li>
                  <RouterLink to="/software-design/2020-09/step1">Step 1: Experience reactive data binding</RouterLink>
                </li>
                <li>
                  <RouterLink to="/software-design/2020-09/step2"
                    >Step 2: Learn the basics of componentization and page navigation to build an SPA</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/software-design/2020-09/step3"
                    >Step 3: Address issues arising from component splitting
                  </RouterLink>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </aside>

      <div class="sd-view-right">
        <RouterView />
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="css" scoped>
.sd-view {
  --sd-view-title-color: var(--app-color-brand);
  --sd-view-title-color-text: white;
  --sd-view-left-width: 380px;
  --sd-view-padding: var(--app-spacing-md);
  --sd-view-header-indent: 3em hanging;

  .sd-view-main {
    width: 100%;
    min-height: 100vh;
  }

  aside {
    position: fixed;
    top: var(--layout-header-height);
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: var(--app-spacing-sm);
    width: var(--sd-view-left-width);
    height: auto;
    padding: var(--sd-view-padding) var(--app-spacing-sm);
    overflow: hidden;
    border-right: solid 1px var(--app-surface-border);

    > header {
      color: var(--app-color-text);
      background-color: var(--app-surface-section);
      border: solid 1px var(--app-surface-border);
      border-radius: var(--app-radius-md);

      .sd-view-title {
        padding: var(--app-spacing-sm);
        font-size: var(--app-text-base);
        font-weight: var(--app-weight-bold);
        line-height: var(--app-leading-tight);
        color: var(--sd-view-title-color-text);
        background-color: var(--sd-view-title-color);
        border-radius: var(--app-radius-md) var(--app-radius-md) 0 0;
      }

      p {
        padding: var(--app-spacing-sm);
        font-size: var(--app-text-sm);
      }
    }

    .sd-view-menu {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      overflow: hidden;
      color: var(--app-color-text);
      background-color: var(--app-surface-section);
      border: solid 1px var(--app-surface-border);
      border-radius: var(--app-radius-md);
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: var(--app-spacing-md);
      overflow-y: auto;

      section {
        header {
          position: sticky;
          top: 0;
          z-index: 1;
          color: var(--app-color-text);
          background-color: var(--app-surface-section);
          border-bottom: solid 1px var(--app-surface-border);

          > .title {
            padding: var(--app-spacing-sm);
            font-size: var(--app-text-sm);
            font-weight: bold;
            color: var(--app-color-text);
          }
        }

        > p {
          padding: var(--app-spacing-sm);
          font-size: var(--app-text-sm);
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: var(--app-spacing-xs);
        padding: var(--app-spacing-xs);
        padding-inline-start: var(--app-spacing-sm);

        li a {
          display: block;
          font-size: var(--app-text-sm);
          line-height: var(--app-leading-tight);
          text-indent: var(--sd-view-header-indent);
          list-style: none;
          background-color: var(--app-surface-card);
          border: solid 1px var(--app-surface-border);
          border-radius: var(--app-radius-md);

          &:hover {
            background-color: var(--app-surface-hover);
            border-color: var(--app-border-color-hover);
          }

          &:active {
            transform: translateY(0.4rem) translateX(0.1rem);
          }

          &:focus-visible {
            outline: 2px solid var(--app-color-text-link);
            outline-offset: 2px;
          }
        }
      }
    }
  }

  .sd-view-right {
    padding-left: var(--sd-view-left-width);

    & :deep() {
      main {
        display: flex;
        flex-direction: column;
        gap: var(--app-spacing-md);
        min-height: calc(100vh - var(--layout-header-height));
        padding: var(--sd-view-padding);
      }

      h1 {
        text-indent: var(--sd-view-header-indent);
      }

      iframe {
        display: block;
        width: 100%;
        height: 30vh;
        overflow: auto;
        border: 2px solid var(--app-surface-border);
      }

      .sd-section {
        display: flex;
        flex-direction: column;
        gap: var(--app-spacing-sm);
        padding: var(--app-spacing-md);
        background-color: var(--app-surface-section);
        border: solid 1px var(--app-surface-border);
        border-radius: var(--app-radius-md);
      }

      .sd-card {
        display: flex;
        flex-direction: column;
        gap: var(--app-spacing-sm);
        padding: var(--app-spacing-md);
        background-color: var(--app-surface-card);
        border: solid 1px var(--app-surface-border);
        border-radius: var(--app-radius-md);
      }

      .sd-article-title {
        font-size: var(--app-text-sm);
        line-height: var(--app-leading-tight);
      }
    }
  }
}
</style>
