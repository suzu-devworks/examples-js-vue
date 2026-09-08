<script setup lang="ts">
import { inject } from 'vue'

import { myInjectionKey } from './keys.js'
import type { ISymbolInjector } from './types'

const { sayHello } = inject<ISymbolInjector>(myInjectionKey)!
</script>

<template>
  <div>
    <p>{{ sayHello() }}</p>
  </div>
</template>
