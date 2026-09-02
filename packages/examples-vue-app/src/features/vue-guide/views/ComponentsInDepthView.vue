<script lang="ts">
import { defineComponent, h } from 'vue'

import ModuleComponent from '../components/ModuleComponent.vue'

//Local Registration
const LocalComponent = defineComponent({
  props: { title: String, modelValue: String },
  render() {
    return h('div', { class: 'local-component' }, [
      h('input', {
        type: 'text',
        title: this.title,
        value: this.title,
      }),
      ': ',
      h('span', {}, `echo: ${this.title}`),
    ])
  },
})

export default {
  components: {
    'component-a': LocalComponent,
    'component-b': ModuleComponent,
  },
}
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import ContainerComponent from '../components/ContainerComponent.vue'
import EventComponent from '../components/EventComponent.vue'
import EventInput from '../components/EventInput.vue'
import FallthroughButton from '../components/FallthroughButton.vue'
import MouseTracker from '../components/MouseTracker.vue'
import PropsComponent from '../components/PropsComponent.vue'
import RootNode from '../components/tree/RootNode.vue'

const modelMessage = ref('Hello local component')

const post = reactive({
  title: 'My journey with Vue',
  likes: 42,
  isPublished: false,
  commentIds: [234, 266, 273],
  author: { id: 123, name: 'one two three' },
  requiredValue: 'TRUE',
})

const rangeProps = reactive({
  title: 'object bind.',
  type: 'range',
  max: 1,
  min: 0,
  style: { width: '40px' },
})

function DoPromise(): Promise<number> {
  return new Promise((resolve) => {
    resolve(123)
  })
}

const someEventMessage = ref('')
function OnSomeEvent(event: Event, data: { message: string }) {
  someEventMessage.value = `${new Date().toISOString()}: ${data.message}`
}

const modelEventMessage = ref('')
const capitalizeEventMessage = ref('')

const counter = ref(0)
function onClick(event: Event): void {
  counter.value++
}
</script>

<template>
  <div>
    <h2>Components In-Depth</h2>
    <section>
      <h3>Registration</h3>
      <global-component title="this is global-component." />
      <component-a title="this is local-component." v-model="modelMessage" />
      <component-b title="this is module-component." />
    </section>

    <section>
      <h3>Props</h3>
      <PropsComponent
        v-once
        title="My journey with Vue"
        :likes="42"
        :is-published="false"
        :comment-ids="[234, 266, 273]"
        :author="{ name: 'Veronica', company: 'Veridian Dynamics' }"
        :callback="() => {}"
        :contacts-promise="DoPromise()"
        :required-value="true"
        validation-string="invalid-value."
      />
      <PropsComponent v-bind="post" />
      <input v-bind="rangeProps" />
    </section>

    <section>
      <h3>Events</h3>
      <EventComponent @some-event="OnSomeEvent">Click me</EventComponent>
      <EventComponent @some-event.once="OnSomeEvent">Click me once</EventComponent>
      <p>{{ someEventMessage }}</p>
      <p>
        <EventInput v-model="modelEventMessage" placeholder="normal" />
        <span> : {{ modelEventMessage }}</span>
      </p>
      <p>
        <EventInput v-model.capitalize="capitalizeEventMessage" placeholder="capitalize" />
        <span> : {{ capitalizeEventMessage }}</span>
      </p>
    </section>

    <section>
      <h3>Fallthrough</h3>
      <FallthroughButton title="normal" />
      <FallthroughButton class="large" title="class=large" />
      <FallthroughButton class="large critical" @click="onClick" :title="`@click:${counter}`" />
    </section>

    <section>
      <h3>Slots</h3>
      <ContainerComponent>
        <template #header>
          <h4>Here might be a page title</h4>
        </template>
        <template #footer="{ text, count }">
          <p>Here's some contact info: {{ text }},{{ count }}</p>
        </template>
        <!-- default -->
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </ContainerComponent>
      <MouseTracker v-slot="{ x, y }"> Mouse is at: {{ x }}, {{ y }} </MouseTracker>
    </section>

    <section>
      <h3>Provide / Inject</h3>
      <RootNode />
    </section>
  </div>
</template>

<style scoped lang="scss">
section {
  padding: 0.5rem 0.2rem;

  h3 {
    padding: 0.5rem 0;
    font-weight: bold;
  }
}

.large {
  min-width: 8em;
  padding: 1em;
}

.critical {
  color: red;
}
</style>
