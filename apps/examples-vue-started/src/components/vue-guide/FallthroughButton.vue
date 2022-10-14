<script setup lang="ts">
import { useAttrs } from "vue"

defineProps({
  title: { type: String, required: true },
})

const attrs = useAttrs()
const classAttrs = attrs["class"] as string
</script>

<template>
  <button class="btn" :title="classAttrs">{{ title }}</button>
</template>
