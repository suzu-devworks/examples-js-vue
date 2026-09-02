<script lang="ts">
//import { mapState } from "vuex"
import { mapStores, mapState } from 'pinia'
import { defineComponent } from 'vue'

import MyCounter from '../components/MyCounter.vue'
import primitiveStore from '../composables/primitive-store.ts'
import { useGlobalCounterStore } from '../stores/global-counter.ts'

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
    ...mapState(useGlobalCounterStore, ['globalCount']),
    // registers it as this.myOwnName.
    ...mapState(useGlobalCounterStore, { myOwnName: 'globalCount' }),
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getEvent(__payload: { name?: string; counted: number }) {
      this.primitiveStore.globalCount++
      //this.$store.commit("IncrementGlobal")
      this.globalCountStore.incrementGlobal()
    },
  },
})
</script>

<template>
  <div class="sd-step3-counter article-example">
    <h3>Step 3-1: Example of the counter component with store</h3>

    <div class="container">
      <MyCounter name="With store" :initCount="5" @emitUp="getEvent" class="counter" />
    </div>

    <div class="message">
      <ul>
        <li>Primitive: <input type="text" v-model="primitiveStore.globalCount" /></li>
        <li>Pinia(globalCountStore.globalCount): {{ globalCountStore.globalCount }}</li>
        <li>Pinia(globalCount): {{ globalCount }}</li>
        <li>Pinia(myOwnName): {{ myOwnName }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sd-step3-counter {
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
    width: 100%;
    padding: var(--app-spacing-md);
    background-color: var(--app-surface-card);
    border: 1px solid var(--app-surface-border);
    border-radius: var(--app-radius-md);
  }
}
</style>
