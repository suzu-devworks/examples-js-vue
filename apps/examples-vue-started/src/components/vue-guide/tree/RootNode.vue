<script setup lang="ts">
import { provide, ref } from "vue"
import BranchNode from "./BranchNode.vue"

const message = ref("hello")
provide(/* key */ "message", /* value */ message)
</script>

<template>
  <div class="root-node">
    <input type="text" v-model="message" />
    <p>Root → provide</p>
    <ul>
      <li><BranchNode /></li>
      <li><BranchNode /></li>
    </ul>
  </div>
</template>
