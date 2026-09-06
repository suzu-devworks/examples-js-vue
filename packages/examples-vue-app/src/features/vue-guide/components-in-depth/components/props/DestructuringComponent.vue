<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const { foo = 'hello' } = defineProps<{ foo?: string }>()
// const props = defineProps<{ foo?: string }>() <= The compiler interprets it this way.

const effected = ref<{ foo?: string; timestamp: Date } | null>(null)
watchEffect(() => {
  // Prior to 3.5, it is executed only once.
  // Since 3.5 it will be rerun every time "foo" changes.
  // console.log(foo)
  // console.log(props.foo) <= The compiler interprets it this way.
  effected.value = { foo, timestamp: new Date() }
})

const message = ref<string>('foo is not changed yet.')
watch(
  () => foo,
  (newValue, oldValue) => {
    // console.log(`foo changed from ${oldValue} to ${newValue}`)
    message.value = `foo changed from ${oldValue} to ${newValue}`
  }
)
</script>

<template>
  <div class="destructing-component registered-component">
    <ul>
      <li>watchEffect is [{{ effected?.timestamp.toISOString() }}] {{ effected?.foo }}</li>
      <li>watch is {{ message }}</li>
    </ul>
  </div>
</template>
