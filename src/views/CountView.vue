
<template>
  <div class="count">
    <MyCounter name="Counter 1" :initCount="5" @emitUp="getEvent" />
    <MyCounter name="Counter 2" :initCount="10" @emitUp="getEvent" />
    <p class="message">
      EmitStak:
    <ul>
      <li v-for="item in stack" :key="item">{{ item }}</li>
    </ul>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import MyCounter from '@/components/MyCounter.vue'

export default {
  components: {
    MyCounter
  },
  data() {
    return {
      stack: []
    }
  },
  methods: {
    getEvent(payload) {
      this.stack.push(payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  li {
    list-style: inside;
  }
}
</style>