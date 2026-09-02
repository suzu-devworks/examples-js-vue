import type { IWorkerResponseMessage } from './types'

const _worker: Worker = self as unknown as Worker

_worker.onmessage = (event: MessageEvent<string>) => {
  const reqTime = new Date().toLocaleTimeString()
  setTimeout(() => {
    const resTime = new Date().toLocaleTimeString()
    const data: IWorkerResponseMessage = {
      kind: 'manual',
      message: `${reqTime} -> ${resTime}: ${event.data}`,
    }
    _worker.postMessage(data)
  }, 1000)
}

setInterval(() => {
  const data: IWorkerResponseMessage = {
    message: new Date().toLocaleTimeString(),
  }
  _worker.postMessage(data)
}, 1000)

setTimeout(() => {
  throw Error('Raise Error.')
}, 5000)
