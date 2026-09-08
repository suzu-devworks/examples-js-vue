import type { InjectionKey } from 'vue'

import type { ISymbolInjector } from './types'

// define keys.
export const myInjectionKey = Symbol('ISymbolInjector') as InjectionKey<ISymbolInjector>
