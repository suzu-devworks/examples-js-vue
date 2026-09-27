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

  /**
   * Mechanism for monitoring state changes from the outside.
   */
  subscribe(listener: (state: typeof this.state) => void) {
    this.listeners.add(listener)
    listener({ ...this.state }) // Immediate notification of current status upon registration
    return () => this.listeners.delete(listener) // return release function
  }

  /**
   * Open the dialog with the specified options and return a promise that resolves with the result.
   */
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

  /**
   * Close the dialog and resolve the promise with the result.
   */
  close(result: boolean) {
    this.state.isOpen = false
    this.listeners.forEach((listener) => listener({ ...this.state }))
    if (this.resolvePromise) {
      this.resolvePromise(result)
      this.resolvePromise = null // Clear references to prevent memory leaks
    }
  }
}
export const coreDialog = new GlobalDialogCore()
