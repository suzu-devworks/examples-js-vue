<script lang="ts">
import { defineComponent } from 'vue'

import MyCounter from '../components/MyCounter.vue'

export default defineComponent({
  components: {
    MyCounter,
  },
  data() {
    return {
      stack: [] as object[],
    }
  },
  methods: {
    getEvent(payload: { name?: string; counted: number }) {
      this.stack.push(payload)
    },
  },
})
</script>

<template>
  <div class="sd-step2-counter sd-card">
    <h3>Step 2-1: Example of the first component</h3>

    <div class="container">
      <MyCounter name="Counter 1" :initCount="5" @emitUp="getEvent" class="counter" />
      <MyCounter name="Counter 2" :initCount="10" @emitUp="getEvent" class="counter" />
      <MyCounter name="Counter 3" :initCount="15" @emitUp="getEvent" class="counter" />
    </div>
    <div class="message">
      <p>Emitted stacks:</p>
      <ul>
        <li v-for="(item, index) in stack" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sd-step2-counter {
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--app-spacing-md);
  }

  .counter {
    display: flex;
    flex-direction: column;
    gap: var(--app-spacing-xs);
    padding: var(--app-spacing-md);
    border: 1px solid var(--app-surface-border);
    border-radius: var(--app-radius-md);
  }

  .message {
    padding: var(--app-spacing-md);
    background-color: var(--app-surface-card);
    border: 1px solid var(--app-surface-border);
    border-radius: var(--app-radius-md);
  }
}
</style>
