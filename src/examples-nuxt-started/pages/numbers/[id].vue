<script setup lang="ts">
import { RouteLocationNormalized } from "vue-router"

// https://nuxt.com/docs/getting-started/transitions
definePageMeta({
  layout: "dynamic",
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
  middleware(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    if (to.meta.pageTransition) {
      to.meta.pageTransition = {
        name: +to.params.id > +from.params.id ? "slide-left" : "slide-right",
        mode: "out-in",
      }
      // eslint-disable-next-line no-console
      console.log("transition: ", to.meta.pageTransition.name)
    }
  },
})
</script>

<template>
  <div>
    <h1>Transitions</h1>
    <h2>#{{ $route.params.id }}</h2>
    <p>To apply dynamic transitions using conditional logic.</p>
  </div>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
