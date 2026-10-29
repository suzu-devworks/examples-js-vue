export interface IFetchError {
  statusCode: number
  statusMessage?: string
  data?: {
    data?: Record<string, string[]>
  }
}
