<script setup lang="ts">
defineProps<{
  activeTabName: string
}>()
</script>

<template>
  <div class="dynamic-tab-layout registered-component">
    <header>
      <slot name="selector"></slot>
    </header>

    <!--
    $slots[activeTabName] determines if the slot is provided by the parent
      If not passed, this parent div will not be displayed
    -->
    <div v-if="$slots[activeTabName]" class="slot-wrapper">
      <slot :name="activeTabName"></slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-tab-layout {
  display: flex;
  flex-direction: column;
  gap: var(--app-spacing-sm);
  width: 100%;

  .slot-wrapper {
    flex: 1;
    padding: var(--app-spacing-sm);
    color: var(--app-text-color);
    background-color: var(--app-surface-card);
    border: 1px solid var(--app-surface-border);
    border-radius: var(--app-radius-sm);
  }
}
</style>
