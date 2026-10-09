<script setup lang="ts">
definePageMeta({
  title: 'Interactions',
})

const { openDialog } = useGlobalDialog()
const { toast } = useGlobalToast()
const { isLoading, withLoading } = useGlobalLoading()
const { isDirty, confirmLeave } = useUnsavedChanges()
const { copyText } = useClipboard()

const draft = ref('Edit this draft, then navigate to another page.')
const initialDraft = draft.value
const clipboardValue = 'Copied from the interactions example.'

watch(draft, (value) => {
  isDirty.value = value !== initialDraft
})

onBeforeRouteLeave(confirmLeave)

async function handleOpenDialog() {
  const confirmed = await openDialog({
    title: 'Confirmation🤔',
    text: 'Do you want to perform this operation?',
  })
  if (!confirmed) {
    return
  }

  toast.success('Operation completed.')
}

async function handleLoading() {
  await withLoading(() => new Promise((resolve) => setTimeout(resolve, 1200)))
  toast.success('Loading finished.')
}

async function handleCopy() {
  if (await copyText(clipboardValue)) {
    toast.success('Text copied to clipboard.')
  } else {
    toast.error('Clipboard access is unavailable.')
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <h1 class="m-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Interactions Page</h1>
    <UContainer class="flex flex-col gap-4">
      <UCard title="Global Dialog">
        <p class="mb-4">
          A feature called
          <code>useOverlay</code> is provided by default, so let's use that.
        </p>
        <UButton label="Open Dialog" color="primary" @click="handleOpenDialog" />
      </UCard>

      <UCard title="Global Toast">
        <p class="mb-4">
          There is also a feature called
          <code>useToast</code>.
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

      <UCard title="Global Loading">
        <p class="mb-4">Show a shared loading overlay while an asynchronous operation is running.</p>
        <UButton class="min-w-14 justify-center" color="primary" @click="handleLoading">
          {{ isLoading ? 'Loading...' : 'Start loading' }}
        </UButton>
      </UCard>

      <UCard title="Unsaved Changes">
        <p class="mb-4">Try navigating away after editing this draft.</p>
        <UTextarea v-model="draft" name="draft" label="Draft" :rows="3" class="mb-4 block" />
        <p aria-live="polite">{{ isDirty ? 'Unsaved changes' : 'No unsaved changes' }}</p>
      </UCard>

      <UCard title="Clipboard">
        <p class="mb-4">
          <code>{{ clipboardValue }}</code>
        </p>
        <UButton label="Copy text" color="primary" @click="handleCopy" />
      </UCard>
    </UContainer>
  </div>
</template>
