<script setup lang="ts">
import { GlobalDialog, GlobalLoading, GlobalToast } from './features/interactions'
</script>

<template>
  <RouterView />

  <GlobalDialog />
  <GlobalLoading />
  <GlobalToast />
</template>
