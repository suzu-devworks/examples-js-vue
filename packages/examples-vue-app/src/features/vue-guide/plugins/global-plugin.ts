import type { App } from 'vue'

import type { IPluginParts } from '../types'
import Keys from './keys'

export function Configure(app: App) {
  // global inject.
  app.provide<IPluginParts>(Keys.PluginPartsKey, { say: () => 'hello global!' })
}
