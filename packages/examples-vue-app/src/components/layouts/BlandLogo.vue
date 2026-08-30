<template>
  <a href="/" class="brand-logo">
    <img alt="" aria-hidden="true" class="icon" src="@/assets/logo.svg" />
    <div class="content">
      <div class="title">examples-vue-app</div>
    </div>
  </a>
</template>

<style lang="css" scoped>
.brand-logo {
  --brand-title-size: var(--app-text-base);
  --brand-icon-size: calc(var(--brand-title-size) * 1.25);

  display: flex;
  gap: var(--app-spacing-xs);
  align-items: center;
  padding: var(--app-spacing-xs);
  color: var(--app-color-text-emphasis);
  text-decoration: none;
  cursor: pointer;
  border-radius: var(--app-radius-sm);

  .icon {
    display: block;
    width: var(--brand-icon-size);
    height: var(--brand-icon-size);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: var(--brand-title-size);
      font-weight: var(--app-weight-bold);
      line-height: var(--app-leading-tight);
      letter-spacing: var(--app-tracking-wide);
    }
  }
}
</style>
