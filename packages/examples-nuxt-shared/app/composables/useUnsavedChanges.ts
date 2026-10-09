import { useUnsavedChanges as useVueUnsavedChanges, type OpenDialog } from 'examples-vue-shared'

import { useGlobalDialog } from './useGlobalDialog'

export type { DialogOptions, OpenDialog } from 'examples-vue-shared'

// Defaults to the shared global dialog; UI libraries with their own dialog can pass `openDialog`.
export function useUnsavedChanges(openDialog?: OpenDialog) {
  const open: OpenDialog = openDialog ?? (import.meta.client ? useGlobalDialog().openDialog : async () => true)
  return useVueUnsavedChanges(open)
}
