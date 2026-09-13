<script setup lang="ts">
import { AccountPanel } from '@/features/auth'
</script>

<template>
  <main class="posts-layout-view article-page">
    <header>
      <h1>Route Meta Fields example</h1>
      <p>Advanced / Route Meta Fields</p>
    </header>

    <section class="account-section article-section">
      <div class="spacer"></div>
      <AccountPanel />
    </section>

    <RouterView />
  </main>
</template>

<style lang="css" scoped>
.posts-layout-view {
  .account-section {
    display: flex;
    flex-direction: row;
    gap: var(--app-spacing-xs);
    align-items: center;
    justify-content: center;
    padding: var(--app-spacing-xs) var(--app-spacing-md);

    > .spacer {
      flex: 1;
    }
  }
}
</style>
