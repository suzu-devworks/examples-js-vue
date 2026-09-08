<script setup lang="ts">
import { provide } from 'vue'

import { myInjectionKey } from './keys.js'
import SymbolInjector from './SymbolInjector.vue'

provide(myInjectionKey, { sayHello: () => 'Hello' })
</script>

<template>
  <div class="reactive-provider registered-component">
    <SymbolInjector />
  </div>
</template>
