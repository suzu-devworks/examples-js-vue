<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const { initial } = defineProps<{ initial: string }>()

const data = ref(initial ?? '')
const message = ref<string[]>([])

// Use Query Suffix. ?worker or ?sharedworker
import MyWorker from '../shared-worker?sharedworker'
import type { IWorkerMessage } from '../types'

let worker: SharedWorker | null = null

function startWorker(): void {
  if (!worker) {
    worker = new MyWorker()

    worker.port.onmessage = (event: MessageEvent<IWorkerMessage>) => {
      const response = event.data

      const time = new Date().toLocaleTimeString()
      message.value.push(`${time}: < received[${response.kind}]: ${response.message}`)
    }

    worker.onerror = (event: ErrorEvent) => {
      const time = new Date().toLocaleTimeString()
      message.value.push(`${time}: < !![error]!! ${event.message}`)
    }

    worker.port.start()
    const time = new Date().toLocaleTimeString()
    message.value = []
    message.value.push(`${time}: Worker starting...`)
  }
}

function stopWorker(): void {
  if (worker) {
    worker.port.close()
    worker = null

    const time = new Date().toLocaleTimeString()
    message.value.push(`${time}: Worker stopped.`)
  }
}

function sendMessage(): void {
  if (worker) {
    const time = new Date().toLocaleTimeString()
    message.value.push(`${time}: > send: ${data.value}`)
    worker.port.postMessage(data.value)
  }
}

onUnmounted(() => {
  stopWorker()
})

const starting = ref(false)
function onChangeStartWorker(): void {
  if (starting.value) {
    startWorker()
  } else {
    stopWorker()
  }
}
</script>

<template>
  <div class="dedicated-worker-component">
    <header>
      <label>
        <input
          type="checkbox"
          v-model="starting"
          switch
          role="switch"
          name="start-worker"
          @change="onChangeStartWorker"
        />
      </label>
    </header>

    <textarea :value="message.join('\n')" name="message" readonly></textarea>

    <footer>
      <input type="text" v-model="data" name="data" />
      <button @click="sendMessage">Execute</button>
    </footer>
  </div>
</template>

<style lang="css" scoped>
.dedicated-worker-component {
  display: flex;
  flex-direction: column;

  header,
  footer {
    display: flex;
    gap: var(--app-spacing-sm);
    align-items: center;
    padding: var(--app-spacing-sm);
    background-color: var(--app-surface-section);
  }

  footer {
    input[type='text'] {
      flex: 1;
    }

    button {
      flex: none;
    }
  }

  textarea {
    min-height: 10em;
    font-family: var(--app-font-mono);
    font-size: var(--app-text-sm);
    line-height: var(--app-leading-tight);
  }
}
</style>
