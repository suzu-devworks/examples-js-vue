<script setup lang="ts">
import { useGlobalToast, type ToastQueueItem } from 'examples-vue-shared'
import { computed, onScopeDispose, watch } from 'vue'

const { queue, updateQueue } = useGlobalToast()
const totalVisible = 3
const visibleItems = computed(() => queue.value.slice(0, totalVisible))
const timers = new Map<ToastQueueItem, ReturnType<typeof setTimeout>>()

function dismiss(item: ToastQueueItem) {
  updateQueue(queue.value.filter((queuedItem) => queuedItem !== item))
}

watch(
  visibleItems,
  (items) => {
    const visibleSet = new Set(items)

    for (const [item, timer] of timers) {
      if (!visibleSet.has(item)) {
        clearTimeout(timer)
        timers.delete(item)
      }
    }

    for (const item of items) {
      if (!timers.has(item)) {
        timers.set(
          item,
          setTimeout(() => dismiss(item), item.timeout),
        )
      }
    }
  },
  { flush: 'post', immediate: true },
)

onScopeDispose(() => {
  for (const timer of timers.values()) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <Teleport to="body">
    <ol v-if="visibleItems.length" class="toast-stack" aria-label="Notifications" aria-live="polite">
      <li
        v-for="(item, index) in visibleItems"
        :key="index"
        class="toast-item"
        :style="{
          color: `var(--app-color-on-${item.color})`,
          backgroundColor: `var(--app-color-${item.color})`,
          borderColor: `var(--app-color-${item.color})`,
        }"
      >
        <div>
          <span class="toast-type">{{ item.color }}</span>
          <p>{{ item.text }}</p>
        </div>
        <button type="button" :aria-label="`Dismiss ${item.color} notification ${index + 1}`" @click="dismiss(item)">
          Dismiss
        </button>
      </li>
    </ol>
  </Teleport>
</template>

<style lang="css" scoped>
.toast-stack {
  position: fixed;
  inset: 0 0 auto auto;
  z-index: 1001;
  display: grid;
  gap: var(--app-spacing-sm);
  width: min(100% - var(--app-spacing-lg), 400px);
  padding: 0;
  margin: var(--app-spacing-md);
  list-style: none;
}

.toast-item {
  display: flex;
  gap: var(--app-spacing-md);
  align-items: center;
  justify-content: space-between;
  padding: var(--app-spacing-md);
  border: 1px solid;
  border-left-width: 4px;
  border-radius: var(--app-radius-md);
  box-shadow: 0 8px 24px hsl(0deg 0% 0% / 0.12);

  p {
    margin: var(--app-spacing-xs) 0 0;
  }

  button {
    flex: 0 0 auto;
    font-size: var(--app-text-sm);
  }
}

.toast-type {
  font-size: var(--app-text-sm);
  font-weight: var(--app-weight-bold);
  text-transform: capitalize;
}

@media (width <= 480px) {
  .toast-stack {
    inset-inline: 0;
    width: auto;
    margin: var(--app-spacing-sm);
  }
}
</style>
