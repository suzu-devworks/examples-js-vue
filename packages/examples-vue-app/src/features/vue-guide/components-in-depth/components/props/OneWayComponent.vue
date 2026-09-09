<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  foo?: string
  initialCounter?: number
  size?: string
  list?: string[]
}>()

// Cannot assign to 'foo'
// props.foo = 'bar'

const counter = ref(props.initialCounter ?? 0)

const normalizedSize = computed(() => props.size?.trim().toLowerCase())

if (props.list) {
  // eslint-disable-next-line vue/no-mutating-props
  props.list[0] = 'A(modified)' // This is allowed, but not recommended. Props should be treated as read-only.
}
</script>

<template>
  <div class="one-way-component registered-component">
    <div v-if="foo !== undefined" class="one-way-component-item">
      <p>foo: {{ props.foo }}</p>
      <!-- eslint-disable-next-line vue/no-mutating-props -->
      <input v-model="props.foo" type="text" name="foo" />
    </div>

    <div v-if="initialCounter !== undefined" class="one-way-component-item">
      <p>counter:</p>
      <ul>
        <li>initialCounter: {{ initialCounter }}</li>
        <li>current: {{ counter }}</li>
      </ul>
      <button type="button" @click="counter++">Increment</button>
    </div>

    <div v-if="size !== undefined" class="one-way-component-item">
      <p>size:</p>
      <ul>
        <li>
          raw:
          <pre>{{ size }}</pre>
        </li>
        <li>
          normalized:
          <pre>{{ normalizedSize }}</pre>
        </li>
      </ul>
    </div>

    <div v-if="list !== undefined" class="one-way-component-item">
      <p>list:</p>
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.one-way-component {
  li pre {
    display: inline-block;
    padding: var(--app-spacing-xs);
    margin: 0;
    background-color: var(--app-surface-card);
    border-radius: var(--app-radius-sm);
  }
}
</style>
