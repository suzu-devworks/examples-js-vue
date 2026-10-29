<template>
  <div class="container registered-component">
    <header>
      <slot name="header"></slot>
    </header>
    <div role="main" class="main">
      <slot></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
footer {
  font-size: 0.8em;
  color: #666;
  border-top: 1px solid #ccc;
}
</style>
