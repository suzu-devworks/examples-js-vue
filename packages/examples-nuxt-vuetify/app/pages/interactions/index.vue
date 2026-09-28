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
  <v-container>
    <h1>Interactions Page</h1>

    <v-sheet class="p-4">
      <v-btn class="bg-primary text-on-primary" @click="handleAction">Open Dialog</v-btn>

      <div class="mt-4 flex flex-wrap gap-2">
        <v-btn color="success" @click="toast.success('Operation completed.')"> Success </v-btn>

        <v-btn color="info" @click="toast.info('Here is some information.')"> Info </v-btn>

        <v-btn color="warning" @click="toast.warning('Please check this.')"> Warning </v-btn>

        <v-btn color="error" @click="toast.error('Something went wrong.')"> Error </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>
