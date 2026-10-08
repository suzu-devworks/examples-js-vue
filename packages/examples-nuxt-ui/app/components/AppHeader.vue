<script setup lang="ts">
const { github } = useAppConfig()

const { items } = useAppMenu()
const open = ref(false)
</script>

<template>
  <UHeader v-model:open="open">
    <template #left>
      <NuxtLink to="/" class="-ms-1 flex items-center rounded-md p-1 outline-primary/25 focus-visible:outline-3">
        <NuxtIcon class="h-5 w-auto shrink-0" />
        <div class="text-2xl font-extrabold tracking-tight">examples-nuxt-ui</div>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton />

      <UButton
        :to="github?.url"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
