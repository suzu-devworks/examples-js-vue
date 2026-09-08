<template>
  <div class="card registered-component">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  padding: 0;
  border: 1px solid var(--app-surface-border);
}

.card-header {
  padding: 4px;
  font-weight: var(--app-weight-bold);
  color: #fff;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  border: none;
  border-radius: 4px;
}

.card-content {
  padding: 4px;
}

.card-footer {
  padding: 4px;
  background-color: lightgray;
}
</style>
