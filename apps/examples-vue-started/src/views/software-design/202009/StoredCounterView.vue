<script lang="ts">
import { defineComponent } from "vue"
// @ is an alias to /src
import MyCounter from "@/components/software-design/MyCounter.vue"
import primitiveStore from "@/composables/software-design/primitive-store"
import { useGlobalCounterStore } from "@/stores/software-design/global-counter"
//import { mapState } from "vuex"
import { mapStores, mapState } from "pinia"

export default defineComponent({
  components: {
    MyCounter,
  },
  data() {
    return {
      primitiveStore: primitiveStore.state,
    }
  },
  computed: {
    //...mapState(["globalCount"]),
    // each store will be accessible as its id + 'Store'
    ...mapStores(useGlobalCounterStore),
    // gives access to this.globalCount inside the component
    ...mapState(useGlobalCounterStore, ["globalCount"]),
    // registers it as this.myOwnName.
    ...mapState(useGlobalCounterStore, { myOwnName: "globalCount" }),
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    getEvent(__payload: any) {
      this.primitiveStore.globalCount++
      //this.$store.commit("IncrementGlobal")
      this.globalCountStore.incrementGlobal()
    },
  },
})
</script>

<template>
  <div class="counter">
    <MyCounter name="Counter 1" :initCount="5" @emitUp="getEvent" class="counteritem" />
    <MyCounter name="Counter 2" :initCount="10" @emitUp="getEvent" class="counteritem" />
    <div class="message">
      <p>Global Store: {{ primitiveStore.globalCount }}</p>
      <input type="text" v-model="primitiveStore.globalCount" />
    </div>
    <div class="message">
      <!-- <p>Vuex: {{ globalCount }}</p> -->
      <p>Pinia: {{ globalCount }}</p>
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
