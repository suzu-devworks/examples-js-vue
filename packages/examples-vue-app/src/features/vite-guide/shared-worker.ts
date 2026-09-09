import type { IWorkerMessage } from './types'

declare const self: SharedWorkerGlobalScope

const connections: MessagePort[] = []

self.onconnect = (e: MessageEvent) => {
  // e.ports[0] is the MessagePort of the newly connected tab
  const port = e.ports[0]
  if (!port) {
    throw Error('No MessagePort found')
  }

  connections.push(port!)

  port.onmessage = (event: MessageEvent<IWorkerMessage>) => {
    setTimeout(() => {
      const data: IWorkerMessage = {
        kind: 'manual',
        timestamp: new Date(),
        message: `${event.data}`,
      }

      // Broadcast to all tabs
      connections.forEach((conn) => {
        conn.postMessage(data)
      })
    }, 1000)
  }

  port.start()
}
