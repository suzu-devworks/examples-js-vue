import type { ToastQueueItem } from 'examples-vue-shared'

export const useToastStore = defineStore('examples/shared/interactions/toast', () => {
  const queue = ref<ToastQueueItem[]>([])

  const setQueue = (newQueue: ToastQueueItem[]) => {
    queue.value = newQueue
  }

  return {
    queue,
    setQueue,
  }
})
