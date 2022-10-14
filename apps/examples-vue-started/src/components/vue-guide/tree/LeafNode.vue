<script setup lang="ts">
import { inject } from "vue"

const message = inject<string>("message")
</script>

<template>
  <div class="leaf-node">
    <p>Message to {{ message }} <span>← inject</span></p>
  </div>
</template>
