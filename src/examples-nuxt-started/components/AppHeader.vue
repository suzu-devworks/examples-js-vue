<script lang="ts" setup>
const app = useNuxtApp()
</script>

<template>
  <header>
    <img src="/img/nuxt-icon-secondary-light.svg" />
    <h1>Nuxt Larning Get Started</h1>

    <a href="https://github.com/suzu-devworks/examples-js-vue" target="_blank">
      <img src="/img/github-mark.svg" />
    </a>
    <span>
      <code>Nuxt {{ app.versions.nuxt }}</code>
    </span>
  </header>
</template>
