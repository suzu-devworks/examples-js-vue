<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

// import '../assets/main.css'
import HelloWorld from '../components/HelloWorld.vue'
import TheWelcome from '../components/TheWelcome.vue'

// Alternatives to import '../assets/main.css'
let styleElement: HTMLStyleElement | null = null

onMounted(async () => {
  // 1. Dynamically import CSS files in assets (obtain as string)
  // In Vite, by adding `?inline` to the end of the path to import,
  // instead of applying CSS immediately to the screen,
  // Can be read as "just string data".
  // Convert this to a <style> tag using JavaScript and manipulate it.
  const cssModule = await import('../assets/main.css?inline')

  // 2. Create a <style> tag and pour the contents
  styleElement = document.createElement('style')
  styleElement.id = 'template-main-css'
  styleElement.textContent = cssModule.default

  // 3. Add to head tag and apply CSS
  document.head.appendChild(styleElement)
})

onUnmounted(() => {
  // 4. Remove the <style> tag when leaving the screen
  if (styleElement) {
    styleElement.remove()
  }
})
</script>

<template>
  <DefaultLayout class="template-view">
    <main>
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
          <HelloWorld msg="You did it!" />
        </div>
      </header>

      <div class="main">
        <TheWelcome />
      </div>
    </main>
  </DefaultLayout>
</template>

<style lang="css" scoped>
.template-view main {
  max-width: 1280px;
  padding: 2rem;
  padding-top: calc(var(--layout-header-height) + var(--layout-border-width));
  margin: 0 auto;
  font-weight: normal;
}

@media (width >= 1024px) {
  .template-view main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
    padding-top: calc(var(--layout-header-height) + var(--layout-border-width));
  }
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }
}
</style>
