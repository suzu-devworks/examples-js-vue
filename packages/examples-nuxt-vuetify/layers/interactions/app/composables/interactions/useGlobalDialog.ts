import { useDialogStore } from '../../stores/interactions/useDialogStore'

export function useGlobalDialog() {
  const store = useDialogStore()
  // Use storeToRefs to maintain store reactivity when retrieving state
  const { isOpen, options: dialogOptions } = storeToRefs(store)

  return {
    isOpen,
    dialogOptions,
    openDialog: store.open,
    closeDialog: store.close,
  }
}
