export const useLoadingStore = defineStore('examples/shared/interactions/loading', () => {
  const isLoading = ref(false)

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  return { isLoading, setLoading }
})
