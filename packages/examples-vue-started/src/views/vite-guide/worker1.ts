import type { IWorkerResponseMesssage } from "@/types/vite-guide"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _worker: Worker = self as any

_worker.onmessage = (event: MessageEvent<string>) => {
  const reqTime = new Date().toLocaleTimeString()
  setTimeout(() => {
    const resTime = new Date().toLocaleTimeString()
    const data: IWorkerResponseMesssage = {
      kind: "manual",
      message: `${reqTime} -> ${resTime}: ${event.data}`,
    }
    _worker.postMessage(data)
  }, 1000)
}

setInterval(() => {
  const data: IWorkerResponseMesssage = {
    message: new Date().toLocaleTimeString(),
  }
  _worker.postMessage(data)
}, 1000)

setTimeout(() => {
  throw Error("Raise Error.")
}, 5000)
