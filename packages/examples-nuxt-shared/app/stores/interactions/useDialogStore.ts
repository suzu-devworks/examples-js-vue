interface DialogOptions {
  title: string
  text: string
  confirmText?: string
  cancelText?: string
  persistent?: boolean
  type?: 'info' | 'warning' | 'error' | 'success'
}

export const useDialogStore = defineStore('interactions/dialog', () => {
  // Reactive state (safely synced with SSR/Hydration)
  const isOpen = ref(false)
  const options = ref<DialogOptions>({ title: '', text: '' })

  // Non-reactive variables (kept only in client memory, safe during SSR)
  let resolvePromise: ((value: boolean) => void) | null = null

  /**
   * Open a dialog and wait for the user's decision
   */
  const open = (newOptions: DialogOptions): Promise<boolean> => {
    options.value = {
      confirmText: 'OK',
      cancelText: 'Cancel',
      persistent: false,
      type: 'info',
      ...newOptions,
    }
    isOpen.value = true

    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve
    })
  }

  /**
   * Close the dialog and call back the result
   */
  const close = (result: boolean) => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(result)
      resolvePromise = null // Clear references to prevent memory leaks
    }
  }

  return {
    isOpen,
    options,
    open,
    close,
  }
})
