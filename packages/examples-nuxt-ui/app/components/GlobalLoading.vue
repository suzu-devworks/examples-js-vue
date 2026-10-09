<script setup lang="ts">
const { isLoading } = useGlobalLoading()
</script>

<template>
  <ClientOnly>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        class="pointer-events-auto fixed inset-0 z-9999 flex flex-col items-center justify-center backdrop-blur-sm"
      >
        <UIcon name="i-lucide-loader-circle" class="size-12 animate-spin text-primary" />
        <p class="mt-4 text-sm font-medium">Loading...</p>
      </div>
    </Transition>
  </ClientOnly>
</template>
