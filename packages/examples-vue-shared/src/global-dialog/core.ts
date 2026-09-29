export interface DialogOptions {
  title: string
  text: string
  confirmText?: string
  cancelText?: string
  persistent?: boolean
}

class GlobalDialogCore {
  private state = { isOpen: false, options: { title: '', text: '' } as DialogOptions }
  private listeners = new Set<(state: typeof this.state) => void>()
  private resolvePromise: ((value: boolean) => void) | null = null

  subscribe(listener: (state: typeof this.state) => void) {
    this.listeners.add(listener)
    listener({ ...this.state })
    return () => this.listeners.delete(listener)
  }

  open(options: DialogOptions): Promise<boolean> {
    this.resolvePromise?.(false)

    this.state = {
      isOpen: true,
      options: {
        confirmText: 'OK',
        cancelText: 'Cancel',
        persistent: false,
        ...options,
      },
    }
    this.listeners.forEach((listener) => listener({ ...this.state }))
    return new Promise((resolve) => {
      this.resolvePromise = resolve
    })
  }

  close(result: boolean) {
    this.state.isOpen = false
    this.listeners.forEach((listener) => listener({ ...this.state }))
    if (this.resolvePromise) {
      this.resolvePromise(result)
      this.resolvePromise = null
    }
  }
}

export const coreDialog = new GlobalDialogCore()
