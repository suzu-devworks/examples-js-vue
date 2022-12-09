<script setup lang="ts">
import { inject } from "vue"
import Keys from "@/plugins/vue-guide/keys"

const plugin = inject(Keys.PluginPartsKey)
const message = plugin?.say()
</script>

<template>
  <div class="leaf-node">
    <p>Message to {{ message }} <span>← inject</span></p>
  </div>
</template>
