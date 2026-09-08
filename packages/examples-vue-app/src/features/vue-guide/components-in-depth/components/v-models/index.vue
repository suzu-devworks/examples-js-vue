<script setup lang="ts">
import { reactive, ref } from 'vue'

import CapitalizeInput from './CapitalizeInput.vue'
import ChildComponent from './ChildComponent.vue'
import MyComponent from './MyComponent.vue'
import TwoWayCounter from './TwoWayCounter.vue'
import UserName from './UserName.vue'

const message = ref('Hello World!')

const bookTitle = ref('v-model argument example')
const twoWayCounter = ref()

const parson = reactive({
  firstName: 'John',
  lastName: 'Doe',
})

const myText = ref('')
</script>

<template>
  <section class="article-section">
    <h2>Basic Usage</h2>
    <p><code>v-model</code> can be used on a component to implement a two-way binding.</p>

    <div class="article-example">
      <input type="text" v-model="message" />
      <ChildComponent v-model="message" />
    </div>
  </section>

  <section class="article-section">
    <h2><code>v-model</code> Arguments</h2>
    <p><code>v-model</code> on a component can also accept an argument.</p>

    <div class="article-example">
      <h3>Pass it using <code>v-model:title="..."</code> with the argument specified:</h3>
      <input type="text" v-model="bookTitle" />
      <MyComponent v-model:title="bookTitle" />
    </div>

    <div class="article-example">
      <h3>Added support for <code>undefined</code> in numeric arguments:</h3>
      <input type="number" v-model="twoWayCounter" />
      <TwoWayCounter v-model="twoWayCounter" />
    </div>
  </section>

  <section class="article-section">
    <h2>Multiple v-model Bindings</h2>
    <p>Multiple v-model bindings can be used to bind multiple properties.</p>

    <div class="article-example">
      <div class="horizontal-form">
        <input type="text" v-model="parson.firstName" />
        <input type="text" v-model="parson.lastName" />
      </div>
      <UserName v-model:first-name="parson.firstName" v-model:last-name="parson.lastName" />
    </div>
  </section>

  <section class="article-section">
    <h2>Handling v-model Modifiers</h2>
    <p>
      You can support custom modifiers for <code>v-model</code> in custom input components.For example, if you support
      <code>capitalize</code>:
    </p>

    <div class="article-example">
      <CapitalizeInput v-model.capitalize="myText" />
    </div>
  </section>
</template>

<style lang="css" scoped>
.horizontal-form {
  display: flex;
  gap: var(--app-spacing-sm);
}
</style>
