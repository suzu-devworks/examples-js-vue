<script setup lang="ts">
import { inject, useId, type Ref } from 'vue'

const message = inject<Ref<string>>('message')

const id = useId()
</script>

<template>
  <div class="leaf-node" :id="id">
    <span>🍃Leaf:</span>
    <input type="text" name="message" :value="message" readonly />
  </div>
</template>
