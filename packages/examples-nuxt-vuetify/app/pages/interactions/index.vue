<script setup lang="ts">
const { openDialog } = useGlobalDialog()
const { toast } = useGlobalToast()

async function handleAction() {
  const confirmed = await openDialog({
    title: 'Confirmation via Pinia',
    text: 'Do you want to perform this operation? You can check the status of your store in Vue DevTools.',
  })

  if (confirmed) {
    // Processing when confirmed
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
  </v-container>
</template>
