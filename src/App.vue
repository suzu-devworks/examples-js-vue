<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MyCounter name="Counter 1" :initCount="5" @emitUp="getEvent" />
    <MyCounter name="Counter 2" :initCount="10" @emitUp="getEvent" />
    <p class="message">
      EmitStak:
      <ul>
        <li v-for="item in stack" :key="item" >{{ item }}</li>
      </ul>
    </p>
    <HelloWorld msg="Welcome to Your Vue.js App"/> 
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyCounter from './components/MyCounter.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MyCounter
  },
  data(){
    return {
      stack: []
    }
  },
  methods: {
    getEvent(payload){
      this.stack.push(payload)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.message li {
  list-style: inside;
}
</style>
