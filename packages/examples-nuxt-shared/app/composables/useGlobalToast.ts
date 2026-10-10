import { useGlobalToast as useVueToast } from 'examples-vue-shared'

import { useToastStore } from '../stores/interactions/useToastStore'

export type { ToastOptions } from 'examples-vue-shared'

export interface GlobalToastOptions {
  totalVisible?: number
}

export function useGlobalToast(options: GlobalToastOptions = {}) {
  const store = useToastStore()
  const vueToast = useVueToast()
  const { queue } = storeToRefs(store)

  if (import.meta.client) {
    watch(
      vueToast.queue,
      (newQueue) => {
        store.setQueue([...newQueue])
      },
      { immediate: true, deep: true },
    )

    watch(
      queue,
      (newQueue) => {
        vueToast.updateQueue(newQueue)
      },
      { immediate: true, deep: true },
    )
  }

  return {
    queue,
    toast: vueToast.toast,
    snackbarOptions: {
      totalVisible: options.totalVisible ?? 3,
    },
  }
}
