<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout class="home-view">
    <main>
      <header>
        <div class="brand-logo">
          <img alt="" class="brand-logo-icon" src="@/assets/logo.svg" />
          <div class="brand-logo-content">
            <h1>examples-vue-app</h1>
            <p>This project covers topics such as how to implement the basic features of Vue.js.</p>
          </div>
        </div>
      </header>

      <div class="articles">
        <RouterLink to="/templates" class="article-item">
          <article>
            <h2>&#x1f381; Template generated with create-vue</h2>
            <p>This is a template page generated using the `create-vue` command.</p>
          </article>
        </RouterLink>
      </div>
    </main>
  </DefaultLayout>
</template>

<style lang="css" scoped>
.home-view {
  --brand-logo-size: calc(var(--app-text-base) * 4);
  --brand-logo-title-size: var(--app-text-lg);
  --brand-logo-content-size: var(--app-text-sm);
  --article-item-title-size: var(--app-text-base);
  --article-item-content-size: var(--app-text-sm);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;

    > * {
      min-width: 100%;
    }

    > header {
      display: flex;
      align-items: center;
      padding: var(--app-spacing-sm);
    }
  }

  .brand-logo {
    display: flex;
    gap: var(--app-spacing-sm);
    align-items: center;
    width: 100%;

    .brand-logo-icon {
      display: block;
      flex: 0 0 auto;
      width: var(--brand-logo-size);
      height: var(--brand-logo-size);
    }

    .brand-logo-content {
      flex: 1 1 auto;
      min-width: 0;
      padding-bottom: var(--app-spacing-md);
      font-size: var(--brand-logo-content-size);
      color: var(--app-color-text-muted);
    }

    h1 {
      font-size: var(--brand-logo-title-size);
    }
  }

  .articles {
    --article-list-end-space: var(--app-spacing-xxl);

    display: flex;
    flex-direction: column;
    gap: var(--app-spacing-sm);
    padding: var(--app-spacing-sm);
    padding-block-end: calc(var(--article-list-end-space) + env(safe-area-inset-bottom));

    .article-item {
      padding: var(--app-spacing-md);
      color: var(--app-color-text);
      text-decoration: none;
      cursor: pointer;
      background-color: var(--app-surface-card);
      border: 1px solid var(--app-surface-border);
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

      article {
        font-size: var(--article-item-content-size);
        color: var(--app-color-text-muted);
      }

      h2 {
        font-size: var(--article-item-title-size);
      }
    }
  }
}

@media (width >= 768px) {
  .home-view {
    --brand-logo-size: calc(var(--app-text-base) * 6);
    --brand-logo-title-size: var(--app-text-2xl);
    --brand-logo-content-size: var(--app-text-base);
    --article-item-title-size: var(--app-text-lg);
    --article-item-content-size: var(--app-text-base);

    main {
      max-width: 700px;

      > header {
        height: 60vh;
      }
    }
  }
}
</style>
