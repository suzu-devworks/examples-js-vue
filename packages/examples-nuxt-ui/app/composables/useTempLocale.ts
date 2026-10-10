import { useAppLocale } from './useAppLocale'

export const useTempLocale = () => {
  const { state, setLocale } = useAppLocale()

  onUnmounted(() => {
    setLocale()
  })

  return { state, setLocale }
}
