import { useGlobalDialog as useVueDialog } from 'examples-vue-shared'

import { useDialogStore } from '../stores/interactions/useDialogStore'

export function useGlobalDialog() {
  const store = useDialogStore()
  const vueDialog = useVueDialog()

  // Use storeToRefs to maintain store reactivity when retrieving state
  const { isOpen, options: dialogOptions } = storeToRefs(store)

  if (import.meta.client) {
    // Client-side specific logic can go here
    watch(
      vueDialog.isOpen,
      (newVal) => {
        store.setOpen(newVal)
      },
      { immediate: true },
    )

    watch(
      vueDialog.dialogOptions,
      (newVal) => {
        store.setOptions(newVal)
      },
      { immediate: true },
    )
  }

  return {
    isOpen,
    dialogOptions,
    openDialog: vueDialog.openDialog,
    closeDialog: vueDialog.closeDialog,
  }
}
