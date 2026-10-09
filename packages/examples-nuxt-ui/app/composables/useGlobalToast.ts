export function useGlobalToast() {
  const coreToast = useToast()

  const toast = {
    success: (message: string, options?: ToastOptions) =>
      coreToast.add({ title: 'Success', description: message, color: 'success', duration: options?.timeout }),
    info: (message: string, options?: ToastOptions) =>
      coreToast.add({ title: 'Info', description: message, color: 'info', duration: options?.timeout }),
    warning: (message: string, options?: ToastOptions) =>
      coreToast.add({ title: 'Warning', description: message, color: 'warning', duration: options?.timeout }),
    error: (message: string, options?: ToastOptions) =>
      coreToast.add({ title: 'Error', description: message, color: 'error', duration: options?.timeout }),
  }

  return {
    toast,
  }
}
