<script setup lang="ts">
// https://nuxt.com/docs/getting-started/seo-meta

useHead({
  title: "My App",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* https://nuxt.com/docs/getting-started/transitions */

/* pageTransition key is `page` */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* other transitions key is `rotate` */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

/* layoutTransition key is `layout` */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
