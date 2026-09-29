<script setup lang="ts">
import { useGlobalLoading } from 'examples-vue-shared'

const { isLoading } = useGlobalLoading()
</script>

<template>
  <Teleport to="body">
    <div v-if="isLoading" class="loading-backdrop" role="status" aria-live="polite">
      <span class="loading-spinner" aria-hidden="true" />
      <span>Loading...</span>
    </div>
  </Teleport>
</template>

<style lang="css" scoped>
.loading-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  gap: var(--app-spacing-sm);
  align-items: center;
  justify-content: center;
  color: var(--app-color-text);
  background-color: var(--app-surface-overlay);
}

.loading-spinner {
  width: 1.5rem;
  aspect-ratio: 1;
  border: 3px solid currentcolor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation-duration: 2s;
  }
}
</style>
