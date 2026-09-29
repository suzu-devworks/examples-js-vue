import { computed, readonly, ref } from 'vue'

const activeOperations = ref(0)
const isLoading = computed(() => activeOperations.value > 0)

async function withLoading<T>(operation: () => Promise<T>): Promise<T> {
  activeOperations.value += 1

  try {
    return await operation()
  } finally {
    activeOperations.value -= 1
  }
}

export function useGlobalLoading() {
  return {
    isLoading: readonly(isLoading),
    withLoading,
  }
}
