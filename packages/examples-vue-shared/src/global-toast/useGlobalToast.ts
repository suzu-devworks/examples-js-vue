import { onScopeDispose, readonly, ref } from 'vue'

import { coreToast, type ToastQueueItem } from './core'

export function useGlobalToast() {
  const queue = ref<ToastQueueItem[]>([])

  const unsubscribe = coreToast.subscribe((nextQueue) => {
    queue.value = nextQueue
  })

  onScopeDispose(unsubscribe)

  return {
    queue: readonly(queue),
    toast: coreToast.toast,
    updateQueue: (nextQueue: ToastQueueItem[]) => coreToast.updateQueue(nextQueue),
  }
}
