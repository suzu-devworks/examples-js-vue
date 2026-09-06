<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  title: { type: String, required: true },
})

const attrs = useAttrs()

const classAttrs = computed(() => attrs.class)
const restAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})
</script>

<template>
  <div class="my-fallthrough-button registered-component" :class="classAttrs">
    <button type="button" class="my-button registered-component" v-bind="restAttrs">{{ title }}</button>
  </div>
</template>
