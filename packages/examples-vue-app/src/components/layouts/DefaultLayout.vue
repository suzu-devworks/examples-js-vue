<script setup lang="ts">
import BlandLogo from './BlandLogo.vue'
</script>

<template>
  <div class="default-layout">
    <header>
      <BlandLogo />
      <div class="layout-header-right">
        <slot name="header" />
      </div>
    </header>

    <slot />

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="css" scoped>
.default-layout {
  --layout-header-height: 2.4rem;
  --layout-footer-height: 0;
  --layout-border-width: 1px;
  --layout-border: var(--layout-border-width) solid var(--app-surface-border);
  --layout-fixed-surface: var(--app-surface-ground);
  --layout-z-index: 10;

  /* Positioning */
  > header,
  > footer {
    position: fixed;
    right: 0;
    left: 0;
    z-index: var(--layout-z-index);
    width: auto;
  }

  > header {
    top: 0;

    /* Layout and appearance */
    display: flex;
    align-items: center;
    height: var(--layout-header-height);
    padding: 0 var(--app-spacing-sm);
    overflow: hidden;
    background-color: var(--layout-fixed-surface);
    border-bottom: var(--layout-border);

    .layout-header {
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0 auto;
    }

    .layout-header-right {
      display: flex;
      flex: auto;
      align-items: center;
      justify-content: flex-end;
      min-width: 0;
      overflow: hidden;

      > * {
        min-width: 0;
      }
    }
  }

  & > header + :deep(*) {
    padding-top: var(--layout-header-height);
  }

  & > :deep(*:has(+ footer:not(:empty))) {
    padding-bottom: var(--layout-footer-height);
  }

  > footer:not(:empty) {
    bottom: 0;

    /* Layout and appearance */
    display: flex;
    align-items: center;
    height: var(--layout-footer-height);
    padding: var(--app-spacing-sm);
    background-color: var(--layout-fixed-surface);
    border-top: var(--layout-border);
  }
}
</style>
