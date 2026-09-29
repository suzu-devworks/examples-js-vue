export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastOptions {
  timeout?: number
}

export interface ToastQueueItem {
  text: string
  color: ToastType
  timeout: number
  prependIcon: string
}

export interface ToastMethods {
  success: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
}

class GlobalToastCore {
  private queue: ToastQueueItem[] = []
  private listeners = new Set<(queue: ToastQueueItem[]) => void>()
  readonly toast: ToastMethods = {
    success: (message, options) => this.add('success', message, options),
    info: (message, options) => this.add('info', message, options),
    warning: (message, options) => this.add('warning', message, options),
    error: (message, options) => this.add('error', message, options),
  }

  subscribe(listener: (queue: ToastQueueItem[]) => void) {
    this.listeners.add(listener)
    listener([...this.queue])
    return () => this.listeners.delete(listener)
  }

  updateQueue(queue: ToastQueueItem[]) {
    if (this.isSameQueue(this.queue, queue)) {
      return
    }

    this.queue = [...queue]
    this.notify()
  }

  private add(type: ToastType, message: string, options?: ToastOptions) {
    const icons: Record<ToastType, string> = {
      success: 'mdi-check-circle',
      info: 'mdi-information',
      warning: 'mdi-alert',
      error: 'mdi-alert-circle',
    }

    this.queue = [
      ...this.queue,
      {
        text: message,
        color: type,
        timeout: options?.timeout ?? 4000,
        prependIcon: icons[type],
      },
    ]
    this.notify()
  }

  private isSameQueue(left: ToastQueueItem[], right: ToastQueueItem[]) {
    return (
      left.length === right.length &&
      left.every((item, index) => {
        const nextItem = right[index]
        return (
          item.text === nextItem.text &&
          item.color === nextItem.color &&
          item.timeout === nextItem.timeout &&
          item.prependIcon === nextItem.prependIcon
        )
      })
    )
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.queue]))
  }
}

export const coreToast = new GlobalToastCore()
