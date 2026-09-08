import type { IWorkerMessage } from './types'

const context = self as unknown as DedicatedWorkerGlobalScope

context.onmessage = (event: MessageEvent<string>) => {
  setTimeout(() => {
    const data: IWorkerMessage = {
      kind: 'manual',
      timestamp: new Date(),
      message: `${event.data}`,
    }
    context.postMessage(data)
  }, 1000)
}

const timer = setInterval(() => {
  const data: IWorkerMessage = {
    kind: 'auto',
    timestamp: new Date(),
    message: 'interval',
  }
  context.postMessage(data)
}, 2000)

setTimeout(() => {
  clearInterval(timer)
  throw Error('Raise Error.')
}, 10000)
