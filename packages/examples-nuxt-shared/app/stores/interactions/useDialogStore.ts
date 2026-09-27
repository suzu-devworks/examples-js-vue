import type { DialogOptions } from 'examples-vue-shared'

type SharedDialogOptions = DialogOptions

export const useDialogStore = defineStore('examples/shared/interactions/dialog', () => {
  // Reactive state (safely synced with SSR/Hydration)
  const isOpen = ref(false)
  const options = ref<SharedDialogOptions>({ title: '', text: '' })

  const setOpen = (value: boolean) => {
    isOpen.value = value
  }

  const setOptions = (newOptions: SharedDialogOptions) => {
    options.value = newOptions
  }

  return {
    isOpen,
    options,
    setOpen,
    setOptions,
  }
})
