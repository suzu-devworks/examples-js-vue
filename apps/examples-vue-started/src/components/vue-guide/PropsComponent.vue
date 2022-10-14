<script setup lang="ts">
import { computed, ref, watch } from "vue"

const props = defineProps({
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise<number>, // またはその他のコンストラクタ
  //validation.
  multiTypes: [Number, String],
  requiredValue: { type: [Boolean, String], required: true },
  defaultValue: { type: Number, default: 100 },
  defaultObject: {
    type: Object,
    default() {
      // factory.
      return { name: "default" }
    },
  },
  varidationString: {
    type: String,
    validator(value: string) {
      // throw warning.
      var success = ["success", "warning", "danger"].includes(value)
      return success
    },
  },
})

const counter = ref(props.likes ?? 0)
function increment(): void {
  counter.value++
}
const computedCounter = computed(() => counter.value * 2)
const nonComputedCounter = counter.value * 2
function functionCounter(): number {
  return counter.value * 2
}
watch(counter, (count, prev) => {
  console.log(`watcher: ${prev} -> ${count}`)
})
</script>

<template>
  <div>
    <p>{{ props }}</p>
    <div>
      <button @click="increment">count : {{ counter }}</button>
      <ul>
        <li>function: {{ functionCounter() }}</li>
        <li>computed: {{ computedCounter }}</li>
        <li>non-computed: {{ nonComputedCounter }}</li>
      </ul>
    </div>
  </div>
</template>
