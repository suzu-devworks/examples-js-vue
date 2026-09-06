<script setup lang="ts">
import { ref } from 'vue'

import FallthroughButton from './FallthroughButton.vue'
import MultipleRootLayout from './MultipleRootLayout.vue'
import MyButton from './MyButton.vue'
import MyComponent from './MyComponent.vue'
import NestedButton from './NestedButton.vue'
import NonThroughButton from './NonThroughButton.vue'
import WrappedButton from './WrappedButton.vue'

const counter1 = ref(1)
const counter2 = ref(2)
const counter3 = ref(3)
const counter4 = ref(4)
const counter5 = ref(5)
const counter6 = ref(6)
const counter7 = ref(7)
const counter8 = ref(8)
</script>

<template>
  <section class="article-section">
    <h2>Attribute Inheritance</h2>
    <p>
      A "fallthrough attribute" is an attribute or v-on event listener that is passed to a component, but is not
      explicitly declared in the receiving component's props or emits.
    </p>

    <div class="article-example">
      <h3>class and style Merging</h3>
      <p><code>class="large button-fallthrough"</code></p>
      <div class="registered-component">
        <MyButton class="large button-fallthrough" />
      </div>
      <p>Click Count(not work): {{ counter1 }}</p>
    </div>

    <div class="article-example">
      <h3>v-on Listener Inheritance</h3>
      <p><code>@click="() => counter++"</code></p>
      <div class="registered-component">
        <MyButton @click="() => counter2++" />
      </div>
      <p>Click Count: {{ counter2 }}</p>
    </div>

    <div class="article-example">
      <h3>Nested Component Inheritance</h3>
      <p>
        <code>class="button-fallthrough" <del>@click="() => counter++"</del></code>
      </p>
      <div class="registered-component">
        <NestedButton category="nested" class="button-fallthrough" @click="() => counter3++" />
      </div>
      <p>Click Count(not work): {{ counter3 }}</p>
    </div>
  </section>

  <section class="article-section">
    <h2>Disabling Attribute Inheritance</h2>
    <p>By setting <code>inheritAttrs: false</code>, you can fully control where fall-through attributes are applied.</p>

    <div class="article-example">
      <h3>Prevent automatic attribute inheritance in components.</h3>

      <NonThroughButton class="button-fallthrough" @click="() => counter4++" />
      <p>Click Count(not work): {{ counter4 }}</p>
    </div>

    <div class="article-example">
      <h3>Fall-through attributes can be accessed directly as <code>$attrs</code> within template expressions.</h3>

      <MyComponent
        category="example"
        is-valid
        :is-active="false"
        :counter-value="counter5"
        class="button-fallthrough"
        @click="() => counter5++"
      />
      <p>Click Count(not work): {{ counter5 }}</p>
    </div>

    <div class="article-example">
      <h3>Apply the fall-through attribute to the inside.</h3>
      <p>
        To apply attributes to an inner element rather than the outer one, use <code>inheritAttrs: false</code> and
        <code>v-bind="$attrs"</code>.
      </p>
      <WrappedButton
        category="nested"
        is-valid
        :is-active="false"
        :counter-value="counter6"
        class="button-fallthrough"
        @click="() => counter6++"
      />
      <p>Click Count: {{ counter6 }}</p>
    </div>
  </section>

  <section class="article-section">
    <h2>Attribute Inheritance on Multiple Root Nodes</h2>
    <p>
      When using a multi-root template, a warning will be displayed unless you explicitly specify the fall-through
      attribute <code>v-bind="$attrs"</code>.
    </p>

    <div class="article-example">
      <div class="registered-component">
        <MultipleRootLayout id="custom-layout" @click="() => counter7++" class="clickable success" />
      </div>
      <p>Click Count: {{ counter7 }}</p>
    </div>
  </section>

  <section class="article-section">
    <h3>Accessing Fallthrough Attributes in JavaScript</h3>
    <p>
      Inside <code>script setup</code>, you can access the component's fall-through attributes using the
      <code>useAttrs()</code>
      API.
    </p>

    <div class="article-example">
      <FallthroughButton title="Click Me" class="button-fallthrough" @click="() => counter8++" />
      <p>Click Count: {{ counter8 }}</p>
    </div>
  </section>
</template>

<style lang="css" scoped>
.article-section {
  .button-fallthrough {
    color: var(--app-color-on-secondary);
    background-color: var(--app-color-secondary);

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--app-color-secondary) 85%, #000);
    }
  }

  :deep(.success) {
    padding: var(--app-spacing-sm);
    color: var(--app-color-on-success);
    background-color: var(--app-color-success);
    border-radius: var(--app-radius-sm);
  }
}
</style>
