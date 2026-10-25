export class FetchError extends Error {
  statusCode: number
  statusMessage?: string

  constructor(statusCode: number, statusMessage: string, message?: string) {
    super(message || statusMessage)

    this.name = 'FetchError'
    this.statusCode = statusCode
    this.statusMessage = statusMessage
    Object.setPrototypeOf(this, FetchError.prototype)
  }
}
