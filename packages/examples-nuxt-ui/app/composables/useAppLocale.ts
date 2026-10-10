import { ja, en_gb, fa_ir, uk } from '@nuxt/ui/locale'

export type AppLocale = typeof ja
const DEFAULT_LOCALE: AppLocale = en_gb

const supportedLocales: AppLocale[] = [en_gb, fa_ir, ja, uk]
const localeByCode = new Map(supportedLocales.map((l) => [l.code, l]))

interface LocaleState {
  current: AppLocale
  client: AppLocale
}

export function useAppLocale() {
  const state = useState<LocaleState>('app-locale-state', () => ({
    current: DEFAULT_LOCALE,
    client: DEFAULT_LOCALE,
  }))

  /**
   * Action to initialize the locale based on the browser's language.
   */
  function initLocale() {
    if (typeof navigator !== 'undefined') {
      const locale = navigator.language
      const lang = locale.split('-')[0]
      const detected = localeByCode.get(locale) ?? localeByCode.get(lang!)
      if (detected) {
        state.value.current = detected
        state.value.client = detected
      }
    }
  }

  /**
   * Action to set the current locale.
   * @param newLocale The new locale to set. If not provided, the current locale will be reset to the client locale.
   */
  function setLocale(newLocale?: AppLocale | string) {
    if (!newLocale) {
      // If there is no argument, rewind to client (reference value object)
      state.value.current = state.value.client
      return
    }

    if (typeof newLocale === 'string') {
      // 💡 When a string ('ja', 'en-GB', etc.) is passed, look up the locale by its `code`.
      const found = localeByCode.get(newLocale)
      if (found) {
        state.value.current = found
      }
    } else {
      // Set it as is.
      state.value.current = newLocale
    }
  }

  return {
    state: readonly(state),
    initLocale,
    setLocale,
    supportedLocales,
  }
}
