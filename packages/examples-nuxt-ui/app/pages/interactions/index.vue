<script setup lang="ts">
import { LazyGlobalDialog } from '#components'

definePageMeta({
  title: 'Interactions',
})

const { toast } = useGlobalToast()

const overlay = useOverlay()
const modal = overlay.create(LazyGlobalDialog)

async function handleOpenDialog() {
  const success = await modal.open({ title: 'Confirmation🤔' })
  if (!success) {
    return
  }

  toast.success('Operation completed.')
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <h1 class="m-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Interactions Page</h1>
    <UContainer class="flex flex-col gap-4">
      <UCard title="Global Dialog">
        <p class="mb-4">
          A feature called
          <code class="rounded-xs bg-neutral-100 px-1 font-mono text-sm dark:bg-neutral-700">useOverlay</code> is
          provided by default, so let's use that.
        </p>
        <UButton label="Open Dialog" color="secondary" @click="handleOpenDialog" />
      </UCard>

      <UCard title="Global Toast">
        <p class="mb-4">
          There is also a feature called
          <code class="rounded-xs bg-neutral-100 px-1 font-mono text-sm dark:bg-neutral-700">useToast</code>.
        </p>
        <div class="flex gap-2">
          <UButton
            class="min-w-14 justify-center"
            label="Success"
            color="success"
            @click="toast.success('Operation completed.')"
          />
          <UButton
            class="min-w-14 justify-center"
            label="Info"
            color="info"
            @click="toast.info('Here is some information.')"
          />
          <UButton
            class="min-w-14 justify-center"
            label="Warning"
            color="warning"
            @click="toast.warning('Please check this.')"
          />
          <UButton
            class="min-w-14 justify-center"
            label="Error"
            color="error"
            @click="toast.error('Something went wrong.')"
          />
        </div>
      </UCard>

      <UCard title="Global Loading"></UCard>
      <UCard title="Unsaved Changes"></UCard>
      <UCard title="Clipboard"></UCard>
    </UContainer>
  </div>
</template>
