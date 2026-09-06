<script setup lang="ts">
import { inject } from 'vue'

import type { ILocation } from './types'

const { location, updateLocation } = inject<ILocation>('location')!
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
