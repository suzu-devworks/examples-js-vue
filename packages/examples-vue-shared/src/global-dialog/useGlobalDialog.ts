import { onScopeDispose, readonly, ref } from 'vue'

import { coreDialog, type DialogOptions } from './core'

export function useGlobalDialog() {
  const isOpen = ref(false)
  const dialogOptions = ref<DialogOptions>({ title: '', text: '' })

  // Real-time synchronization (binding) of pure state changes in the first layer to Vue refs
  const unsubscribe = coreDialog.subscribe((state) => {
    isOpen.value = state.isOpen
    dialogOptions.value = state.options
  })

  // Clean up the subscription when the component is unmounted or the scope is disposed
  onScopeDispose(unsubscribe)

  return {
    isOpen: readonly(isOpen),
    dialogOptions: readonly(dialogOptions),
    openDialog: (options: DialogOptions) => coreDialog.open(options),
    closeDialog: (result: boolean) => coreDialog.close(result),
  }
}
