<script setup lang="ts">
// https://nuxt.com/docs/getting-started/transitions
definePageMeta({
  pageTransition: {
    name: "custom-flip",
    mode: "out-in",
    onBeforeEnter: (_el) => {
      // eslint-disable-next-line no-console
      console.log("Transitions: Before enter...")
    },
    onEnter: (_el, _done) => {},
    onAfterEnter: (_el) => {},
  },
})
</script>

<template>
  <div>
    <h1>Transitions</h1>
    <h2>JavaScript Hooks</h2>
    <p><NuxtLink to="/">Home page</NuxtLink></p>
    <p>
      Nuxt leverages Vue's &lt;Transition&gt; component to apply transitions between pages and
      layouts.
    </p>
  </div>
</template>

<style lang="scss" scoped>
/* https://nuxt.com/docs/getting-started/transitions */

/* pageTransition key is `custom-flip` */
.custom-flip-enter-active {
  animation: flipInX 1s;
}
.custom-flip-leave-active {
  animation: flipInX 1s reverse;
}
.custom-flip-enter-from,
.custom-flip-leave-to {
  opacity: 0;
}

@keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
</style>
