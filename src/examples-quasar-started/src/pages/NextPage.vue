<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <h1>Next.</h1>
      <!-- Wrapping only one DOM element, defined by QBtn -->
      <transition appear enter-active-class="animated wobble">
        <q-btn
          color="secondary"
          icon="mail"
          label="Email"
          class="transition-delay"
        />
      </transition>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.transition-delay {
  animation-delay: 200ms;
}
</style>
