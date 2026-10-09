<script setup lang="ts">
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

async function handleAction() {
  const confirmed = await openDialog({
    title: 'Confirmation via Pinia',
    text: 'Do you want to perform this operation? You can check the status of your store in Vue DevTools.',
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
  <v-container class="d-flex flex-column ga-4">
    <h1>Interactions Page</h1>

    <v-sheet class="pa-4" :elevation="1" rounded>
      <h2 class="mt-0">Global Dialog</h2>

      <v-btn color="primary" @click="handleAction">Open Dialog</v-btn>
    </v-sheet>

    <v-sheet class="pa-4" :elevation="1" rounded>
      <h2 class="mt-0">Global Toast</h2>

      <div class="mt-4 d-flex flex-wrap ga-2">
        <v-btn color="success" @click="toast.success('Operation completed.')"> Success </v-btn>

        <v-btn color="info" @click="toast.info('Here is some information.')"> Info </v-btn>

        <v-btn color="warning" @click="toast.warning('Please check this.')"> Warning </v-btn>

        <v-btn color="error" @click="toast.error('Something went wrong.')"> Error </v-btn>
      </div>
    </v-sheet>

    <v-sheet class="pa-4" :elevation="1" rounded>
      <h2 class="mt-0">Global Loading</h2>
      <p>Show a shared loading overlay while an asynchronous operation is running.</p>

      <v-btn color="primary" :disabled="isLoading" @click="handleLoading">
        {{ isLoading ? 'Loading...' : 'Start loading' }}
      </v-btn>
    </v-sheet>

    <v-sheet class="pa-4" :elevation="1" rounded>
      <h2 class="mt-0">Unsaved Changes</h2>
      <p>Try navigating away after editing this draft.</p>
      <v-textarea v-model="draft" auto-grow label="Draft" rows="3" />
      <p aria-live="polite">{{ isDirty ? 'Unsaved changes' : 'No unsaved changes' }}</p>
    </v-sheet>

    <v-sheet class="pa-4" :elevation="1" rounded>
      <h2 class="mt-0">Clipboard</h2>

      <p>
        <code>{{ clipboardValue }}</code>
      </p>

      <v-btn color="primary" @click="handleCopy">Copy text</v-btn>
    </v-sheet>
  </v-container>
</template>
