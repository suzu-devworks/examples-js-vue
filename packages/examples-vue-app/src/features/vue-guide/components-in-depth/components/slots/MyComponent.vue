<template>
  <div class="my-component registered-component">
    <header>
      <slot name="header" message="hello header" />
    </header>
    <div role="main">
      <slot message="hello" />
    </div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
