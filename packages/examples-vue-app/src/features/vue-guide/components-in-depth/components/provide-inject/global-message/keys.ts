import type { InjectionKey } from 'vue'

import type { IGlobalMessage } from './types'

// define keys.
const globalMessageKey = Symbol('IGlobalMessage') as InjectionKey<IGlobalMessage>

export default { globalMessageKey }
