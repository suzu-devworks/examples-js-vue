import { ref } from 'vue'

import type { DialogOptions } from '../global-dialog'

export type OpenDialog = (options: DialogOptions) => Promise<boolean>

export function useUnsavedChanges(openDialog: OpenDialog) {
  const isDirty = ref(false)

  async function confirmLeave() {
    if (!isDirty.value) {
      return true
    }

    const confirmed = await openDialog({
      title: 'Discard unsaved changes?',
      text: 'Your changes will be lost if you leave this page.',
      confirmText: 'Discard changes',
      cancelText: 'Keep editing',
    })

    if (confirmed) {
      isDirty.value = false
    }

    return confirmed
  }

  return { isDirty, confirmLeave }
}
