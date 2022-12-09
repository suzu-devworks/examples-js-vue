<script setup lang="ts">
import { ref } from "vue"
import type { IWorkerResponseMesssage } from "@/types/vite-guide"
// Use Query Suffix. ?worker or ?sharedworker
import MyWorker from "./worker1?worker"

const message = ref("")
const stopMessage = ref("")
const data = ref("send message.")
const stack = ref([] as string[])

//
// A dedicated worker is only accessible by the script that called it.
//const worker = new Worker(new URL("./worker.ts", import.meta.url))
//
// A shared worker is accessible by multiple scripts
//const worker = new SharedWorker(new URL("./worker.ts", import.meta.url))
//
const worker = new MyWorker()
console.log(worker)

worker.onmessage = (event: MessageEvent<IWorkerResponseMesssage>) => {
  //console.log(event)
  //console.log(event.data)
  const response = event.data
  if (response.kind === "manual") {
    stack.value.push(event.data.message)
  } else {
    message.value = event.data.message
  }
}

worker.onerror = (event: ErrorEvent) => {
  //console.log(event)
  console.log(event.message)
}

function sendMessage(): void {
  //console.log(data.value)
  worker.postMessage(data.value)
}

function stopWorker(): void {
  //console.log(data.value)
  worker.terminate()
  stopMessage.value = "Stoped."
}
</script>

<template>
  <div>
    <h2>Web Worker</h2>
    <section>
      <h3>Web Worker message:</h3>
      <div>
        <input type="text" v-model="data" />
        <button @click="sendMessage">Execute</button>
      </div>
      <div class="message">
        <p>Auto message:</p>
        <ul>
          <li>{{ message }}</li>
        </ul>
      </div>
      <div class="message">
        <p>Manual messages:</p>
        <ul>
          <li v-for="(item, index) in stack" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div>
        <button @click="stopWorker">STOP!</button>
        <p>{{ stopMessage }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-weight: bold;
  line-height: 2em;
}
</style>
