import { useGlobalLoading as useVueGlobalLoading } from 'examples-vue-shared'

import { useLoadingStore } from '../stores/interactions/useLoadingStore'

export function useGlobalLoading() {
  const store = useLoadingStore()
  const vueLoading = useVueGlobalLoading()
  const { isLoading } = storeToRefs(store)

  if (import.meta.client) {
    watch(
      vueLoading.isLoading,
      (value) => {
        store.setLoading(value)
      },
      { immediate: true },
    )
  }

  return {
    isLoading,
    withLoading: vueLoading.withLoading,
  }
}
