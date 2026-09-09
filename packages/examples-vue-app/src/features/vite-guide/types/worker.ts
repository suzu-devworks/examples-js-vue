export interface IWorkerMessage {
  kind: 'manual' | 'auto'
  timestamp: Date
  message: string
}
