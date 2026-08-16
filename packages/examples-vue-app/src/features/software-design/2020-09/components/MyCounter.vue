<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: String,
    initCount: { type: Number, required: true },
  },
  emits: {
    emitUp(payload: { name?: string; counted: number }) {
      // ランタイムバリデーションの実行
      return payload.name !== null
    },
  },
  data() {
    return {
      count: this.initCount,
    }
  },
  methods: {
    increment(): void {
      this.count++
      this.$emit("emitUp", { name: this.name, counted: this.count })
    },
  },
})
</script>

<template>
  <div class="my-counter">
    <p>{{ name }}</p>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
