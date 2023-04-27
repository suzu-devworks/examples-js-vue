<script setup lang="ts">
const greetingMessage = "This is footer"
</script>

<template>
  <div class="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div>
      <!-- default -->
      <slot message="use template."></slot>
    </div>
    <div class="footer">
      <slot name="footer" :text="greetingMessage" :count="1"></slot>
    </div>
  </div>
</template>

<style scoped lang="css">
.header {
  color: #333;
  background: rgba(100, 255, 230, 0.8);
}
.footer {
  color: #333;
  background: rgba(200, 255, 230, 0.8);
}
</style>
