<script setup lang="ts">
import { provide, readonly, ref } from 'vue'

import ReactiveInjector from './ReactiveInjector.vue'
import type { ILocation } from './types'

const location = ref('North Pole')

function updateLocation() {
  location.value = location.value === 'South Pole' ? 'North Pole' : 'South Pole'
}

provide<ILocation>('location', {
  location: readonly(location),
  updateLocation,
})
</script>

<template>
  <div class="reactive-provider registered-component">
    <ReactiveInjector />
  </div>
</template>
