<script setup lang="ts">
import { useGlobalDialog } from '#imports'

const { isOpen, dialogOptions, closeDialog } = useGlobalDialog()

// Handling when the overlay is closed by clicking outside the frame
watch(isOpen, (newVal) => {
  if (!newVal) {
    closeDialog(false)
  }
})
</script>

<template>
  <ClientOnly>
    <v-dialog v-model="isOpen" max-width="450" :persistent="dialogOptions.persistent">
      <v-card>
        <v-card-title class="text-title-small font-weight-bold pt-4 px-6">
          {{ dialogOptions.title }}
        </v-card-title>

        <v-card-text class="px-6 py-4">
          {{ dialogOptions.text }}
        </v-card-text>

        <v-card-actions class="px-6 pb-4">
          <v-spacer />

          <v-btn variant="text" @click="closeDialog(false)">
            {{ dialogOptions.cancelText }}
          </v-btn>

          <v-btn class="px-4" color="primary" variant="elevated" @click="closeDialog(true)">
            {{ dialogOptions.confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>
