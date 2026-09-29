import { useUnsavedChanges as useVueUnsavedChanges } from 'examples-vue-shared'

import { useGlobalDialog } from './useGlobalDialog'

export function useUnsavedChanges() {
  const { openDialog } = useGlobalDialog()

  return useVueUnsavedChanges(openDialog)
}
