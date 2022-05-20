
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
    <p>Store: {{ primitiveStore.globalCount }}</p>
    <input type="text" v-model="primitiveStore.globalCount" />
    <p>Vuex: {{ globalCount }}</p>
   </div>
</template>

<script>
 

// @ is an alias to /src
import MyCounter from '@/components/MyCounter.vue'
import primitiveStore from '@/primitiveStore.js'
import { mapState } from 'vuex'

export default {
  components: {
    MyCounter
  },
  data() {
    return {
      stack: [],
      primitiveStore: primitiveStore.state
    }
  },
  methods: {
    getEvent(payload) {
      this.stack.push(payload)
      this.primitiveStore.globalCount++;
      this.$store.commit("IncrementGlobal");
    }
  },
  computed: {
    ...mapState(["globalCount"])
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