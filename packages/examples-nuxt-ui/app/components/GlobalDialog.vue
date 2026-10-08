<script setup lang="ts">
const { title = 'Confirmation', description = 'This modal was opened programmatically with useOverlay.' } =
  defineProps<{
    title?: string
    description?: string
  }>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal :title="title" :description="description" :dismissible="false" :ui="{ footer: 'justify-end' }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <p>Do you want to perform this operation?</p>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton class="w-20 justify-center" variant="ghost" label="Cancel" @click="emit('close', false)" />
        <UButton class="w-20 justify-center" label="OK" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
