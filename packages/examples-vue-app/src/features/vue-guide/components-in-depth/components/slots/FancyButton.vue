<template>
  <button type="button" class="fancy-button registered-component">
    <slot></slot>
    <!-- slot outlet -->
  </button>
</template>

<style lang="css" scoped>
.fancy-button {
  padding: 5px 10px;
  margin: 5px;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  border: none;
  border-radius: 8px;
}
</style>
