import type { App } from 'vue'

import Keys from '../components/provide-inject/global-message/keys'
import type { IGlobalMessage } from '../components/provide-inject/global-message/types'

export function Configure(app: App) {
  // global inject.
  app.provide<IGlobalMessage>(Keys.globalMessageKey, { say: () => 'hello global!' })
}
