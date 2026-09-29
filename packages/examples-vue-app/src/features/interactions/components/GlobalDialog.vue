<script setup lang="ts">
import { useGlobalDialog } from 'examples-vue-shared'
import { nextTick, ref, watch } from 'vue'

const { isOpen, dialogOptions, closeDialog } = useGlobalDialog()
const dialogPanel = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

watch(isOpen, async (open) => {
  if (open) {
    const activeElement = document.activeElement
    previouslyFocusedElement = activeElement instanceof HTMLElement ? activeElement : null

    await nextTick()
    getFocusableElements()[0]?.focus()
    return
  }

  await nextTick()
  previouslyFocusedElement?.focus()
  previouslyFocusedElement = null
})

function getFocusableElements() {
  return Array.from(
    dialogPanel.value?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? [],
  )
}

function _handleDialogKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    dismissDialog()
    return
  }

  if (event.key !== 'Tab') {
    return
  }

  const focusableElements = getFocusableElements()
  const firstElement = focusableElements[0]
  const lastElement = focusableElements.at(-1)

  if (!firstElement || !lastElement) {
    event.preventDefault()
    dialogPanel.value?.focus()
  } else if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

function dismissDialog() {
  if (!dialogOptions.value.persistent) {
    closeDialog(false)
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="dialog-backdrop" @click.self="dismissDialog">
      <section
        ref="dialogPanel"
        class="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-dialog-title"
        tabindex="-1"
        @keydown="_handleDialogKeydown"
      >
        <h2 id="global-dialog-title">{{ dialogOptions.title }}</h2>
        <p>{{ dialogOptions.text }}</p>

        <div class="dialog-actions">
          <button type="button" @click="closeDialog(false)">
            {{ dialogOptions.cancelText ?? 'Cancel' }}
          </button>
          <button class="button-primary" type="button" @click="closeDialog(true)">
            {{ dialogOptions.confirmText ?? 'OK' }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style lang="css" scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: var(--app-spacing-md);
  background-color: var(--app-surface-overlay);
}

.dialog-panel {
  width: min(100%, 450px);
  padding: var(--app-spacing-lg);
  color: var(--app-color-text);
  background-color: var(--app-surface-card);
  border: 1px solid var(--app-surface-border);
  border-radius: var(--app-radius-md);
  box-shadow: 0 16px 48px hsl(0deg 0% 0% / 0.22);

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-size: var(--app-text-lg);
  }

  p {
    margin-top: var(--app-spacing-sm);
    color: var(--app-color-text-muted);
  }
}

.dialog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-spacing-sm);
  justify-content: flex-end;
  margin-top: var(--app-spacing-lg);
}
</style>
