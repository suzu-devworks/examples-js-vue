<script setup lang="ts">
const { openDialog } = useGlobalDialog()

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
    </v-sheet>
  </v-container>
</template>
