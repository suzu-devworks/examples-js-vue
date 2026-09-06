<script setup lang="ts">
import { inject } from 'vue'

import Keys from './keys'

const plugin = inject(Keys.globalMessageKey)
const message = plugin?.say()
</script>

<template>
  <div class="global-component registered-component">
    <p>
      Message <span>{{ message }}</span> from global(plugins)
    </p>
  </div>
</template>

<style lang="css" scoped>
.global-component {
  span {
    color: var(--app-color-accent);
  }
}
</style>
