import type { GlobalDialogProps } from '~~/app/components/GlobalDialog.vue'

import { LazyGlobalDialog } from '#components'

export function useGlobalDialog() {
  const overlay = useOverlay()
  const modal = overlay.create(LazyGlobalDialog)

  async function openDialog(options: GlobalDialogProps) {
    return await modal.open(options)
  }

  return {
    openDialog,
  }
}
