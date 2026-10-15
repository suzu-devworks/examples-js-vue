import {
  useUnsavedChanges as useNuxtUnsavedChanges,
  type OpenDialog,
} from '#layers/shared/app/composables/useUnsavedChanges'

import { useGlobalDialog } from './useGlobalDialog'

export function useUnsavedChanges() {
  const openDialog: OpenDialog = import.meta.client ? useGlobalDialog().openDialog : async () => true
  return useNuxtUnsavedChanges(openDialog)
}
