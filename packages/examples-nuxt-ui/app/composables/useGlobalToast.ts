export function useGlobalToast() {
  const coreToast = useToast()

  const toast = {
    success: (message: string) => coreToast.add({ title: 'Success', description: message, color: 'success' }),
    info: (message: string) => coreToast.add({ title: 'Info', description: message, color: 'info' }),
    warning: (message: string) => coreToast.add({ title: 'Warning', description: message, color: 'warning' }),
    error: (message: string) => coreToast.add({ title: 'Error', description: message, color: 'error' }),
  }

  return {
    toast,
  }
}
