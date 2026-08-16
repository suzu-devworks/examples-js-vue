<script lang="ts">
import { defineComponent } from "vue"
import MyCounter from "../components/MyCounter.vue"

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getEvent(payload: any) {
      this.stack.push(payload)
    },
  },
})
</script>

<template>
  <div class="counter">
    <MyCounter name="Counter 1" :initCount="5" @emitUp="getEvent" class="counter-item" />
    <MyCounter name="Counter 2" :initCount="10" @emitUp="getEvent" class="counter-item" />
    <div class="message">
      <p>EmitStak:</p>
      <ul>
        <li v-for="(item, index) in stack" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.counter-item {
  margin: 0.5rem 0;
  color: black;
  background-color: #ee6;
}

.message {
  margin: 0.5rem 0;
  color: black;
  background-color: #eee;
  li {
    list-style: inside;
  }
}
</style>
