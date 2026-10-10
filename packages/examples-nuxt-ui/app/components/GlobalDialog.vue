<script setup lang="ts">
export interface GlobalDialogProps {
  title?: string
  description?: string
  text?: string
  confirmText?: string
  cancelText?: string
}

const {
  title = 'Confirmation',
  description = 'This modal was opened programmatically with useOverlay.',
  text = 'Do you want to perform this operation?',
  confirmText = 'OK',
  cancelText = 'Cancel',
} = defineProps<GlobalDialogProps>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal :title="title" :description="description" :dismissible="false" :ui="{ footer: 'justify-end' }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <p>{{ text }}</p>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton class="min-w-20 justify-center" variant="ghost" :label="cancelText" @click="emit('close', false)" />
        <UButton class="min-w-20 justify-center" :label="confirmText" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
