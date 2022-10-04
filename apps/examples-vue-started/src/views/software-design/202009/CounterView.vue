<script lang="ts">
import { defineComponent } from "vue"
// @ is an alias to /src
import MyCounter from "@/components/software-design/MyCounter.vue"

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
    <MyCounter name="Counter 1" :initCount="5" @emitUp="getEvent" class="counteritem" />
    <MyCounter name="Counter 2" :initCount="10" @emitUp="getEvent" class="counteritem" />
    <div class="message">
      <p>EmitStak:</p>
      <ul>
        <li v-for="(item, index) in stack" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.counteritem {
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
