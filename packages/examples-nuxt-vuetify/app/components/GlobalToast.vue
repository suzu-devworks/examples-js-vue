<script setup lang="ts">
import { useGlobalToast } from '#imports'

const { queue, snackbarOptions } = useGlobalToast({
  totalVisible: 3,
})
</script>

<template>
  <ClientOnly>
    <v-snackbar-queue v-model="queue" location="top end" :total-visible="snackbarOptions.totalVisible" />
  </ClientOnly>
</template>
