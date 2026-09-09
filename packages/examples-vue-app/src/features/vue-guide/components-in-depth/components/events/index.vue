<script setup lang="ts">
import { ref } from 'vue'

import MyButton from './MyButton.vue'
import MyComponent from './MyComponent.vue'
import MyLogin from './MyLogin.vue'
import MyTextOptions from './MyText.options.vue'
import MyTextRuntime from './MyText.runtime.vue'
import MyTextType from './MyText.type.vue'
import MyTextTypeAlt from './MyText.type3.3.vue'

function setupMessageEvent(text: string) {
  const message = ref('')
  function onSomeEvent() {
    message.value = `${new Date().toISOString()}: ${text}`
  }
  return {
    message,
    onSomeEvent,
  }
}
const some = setupMessageEvent('some-event emitted')
const once = setupMessageEvent('some-event(once) emitted')

const counter = ref(0)

function setupCustomEvent() {
  const message = ref('')

  function onUpdate(value: string) {
    message.value = `${new Date().toISOString()}: update event emitted: ${value}`
  }

  function onChange(count: number) {
    message.value = `${new Date().toISOString()}: change event emitted: ${count}`
  }

  return {
    message,
    onUpdate,
    onChange,
  }
}
const custom1 = setupCustomEvent()
const custom2 = setupCustomEvent()
const custom3 = setupCustomEvent()
const custom4 = setupCustomEvent()

const loginMessage = ref('')
function onSubmit(data: { email: string }) {
  loginMessage.value = `${new Date().toISOString()}: Form submitted: ${data.email}`
}
</script>

<template>
  <section class="article-section">
    <h2>Emitting and Listening to Events</h2>
    <p>
      A component can emit custom events directly in template expressions using the built-in <code>$emit</code> method
    </p>

    <div class="article-example">
      <h3>using the built-in <code>$emit</code> method:</h3>
      <MyComponent @some-event="some.onSomeEvent" />
      <p>{{ some.message }}</p>
    </div>

    <div class="article-example">
      <h3>Execute only once using the <code>.once</code> modifier:</h3>
      <MyComponent @some-event.once="once.onSomeEvent" />
      <p>{{ once.message }}</p>
    </div>
  </section>

  <section class="article-section">
    <h2>Event Arguments</h2>
    <p>You can pass additional arguments to <code>$emit</code> to pass them to the handler function.</p>

    <div class="article-example">
      <MyButton @increase-by="(n) => (counter += n)" />
      <p>Click Count: {{ counter }}</p>
    </div>
  </section>

  <section class="article-section">
    <h2>Declaring Emitted Events</h2>
    <p>A component can explicitly declare the events it will emit using the <code>defineEmits()</code> macro.</p>

    <div class="article-example">
      <h3>runtime</h3>
      <p><code>const emit = defineEmits(['change', 'update'])</code></p>
      <MyTextRuntime @change="custom1.onChange" @update="custom1.onUpdate" />
      <p>{{ custom1.message }}</p>
    </div>

    <div class="article-example">
      <h3>options based</h3>
      <pre><code>const emit = defineEmits({
  change: (count: number) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  },
  update: (value: string) => {
    // ...
  }
})</code></pre>
      <MyTextOptions @change="custom2.onChange" @update="custom2.onUpdate" />
      <p>{{ custom2.message }}</p>
    </div>

    <div class="article-example">
      <h3>type-based</h3>
      <pre><code>const emit = defineEmits&lt;{
  (e: 'change', count: number): void
  (e: 'update', value: string): void
    }&gt;()</code></pre>
      <MyTextType @change="custom3.onChange" @update="custom3.onUpdate" />
      <p>{{ custom3.message }}</p>
    </div>

    <div class="article-example">
      <h3>3.3+: alternative, more succinct syntax</h3>
      <pre><code>const emit = defineEmits&lt;{
  change: [count: number]
  update: [value: string]
    }&gt;()</code></pre>
      <MyTextTypeAlt @change="custom4.onChange" @update="custom4.onUpdate" />
      <p>{{ custom4.message }}</p>
    </div>
  </section>

  <section class="article-section">
    <h2>Events Validation</h2>
    <p>
      While it is possible to validate event parameters,
      <strong>there is no built-in function to cancel the event itself</strong>. Therefore, you need to write custom
      code before firing the event.
    </p>

    <div class="article-example">
      <MyLogin @submit="onSubmit" />
      <p>{{ loginMessage }}</p>
    </div>
  </section>
</template>
