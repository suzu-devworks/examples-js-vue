<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const x = ref(0)
const y = ref(0)

const update = (event: MouseEvent) => {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener("mousemove", update))
onUnmounted(() => window.removeEventListener("mousemove", update))
</script>

<template>
  <slot :x="x" :y="y" />
</template>
