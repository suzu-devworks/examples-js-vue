import type { InjectionKey } from 'vue'

import type { IPluginParts } from '../types'

// define keys.
const PluginPartsKey = Symbol('IPluginParts') as InjectionKey<IPluginParts>

export default { PluginPartsKey }
