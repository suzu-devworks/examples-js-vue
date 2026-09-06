<script setup lang="ts">
import LocalMyComponent from './MyComponent.vue'
import LocalRenderComponent from './render-component.tsx'
</script>

<template>
  <section class="article-section">
    <h2>Global Registration</h2>
    <p>Global components are registered using <code>.component()</code> in a Vue application.</p>

    <div class="article-example">
      <GlobalRenderComponent message="This is a globally registered render-component(*.tsx)." />
      <GlobalMyComponent message="This is a globally registered SFC component(*.vue)." />
    </div>
  </section>

  <section class="article-section">
    <h2>Local Registration</h2>
    <p>
      Using local registration limits the scope in which the registered component can be used to the current component
      only.
    </p>

    <div class="article-example">
      <LocalRenderComponent message="This is a locally registered render-component(*.tsx)." />
      <LocalMyComponent message="This is a locally registered SFC component(*.vue)." />
    </div>
  </section>

  <section class="article-section">
    <h2>Component Name Casing</h2>
    <p>
      While the guide uses PascalCase for components, PascalCase tags cannot be used within DOM templates; therefore,
      kebab-case tags are also supported.
    </p>

    <div class="article-example">
      <LocalMyComponent message="Here it is used in <LocalMyComponent>." />
      <local-my-component message="Here, it is used in <local-my-component>." />
    </div>
  </section>
</template>
