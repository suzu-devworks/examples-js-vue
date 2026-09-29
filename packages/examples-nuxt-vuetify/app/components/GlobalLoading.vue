<script setup lang="ts">
const { isLoading } = useGlobalLoading()
</script>

<template>
  <ClientOnly>
    <v-overlay class="align-center justify-center" :model-value="isLoading" persistent>
      <div aria-live="polite" class="d-flex align-center ga-3" role="status">
        <v-progress-circular color="primary" indeterminate />
        <span>Loading...</span>
      </div>
    </v-overlay>
  </ClientOnly>
</template>
