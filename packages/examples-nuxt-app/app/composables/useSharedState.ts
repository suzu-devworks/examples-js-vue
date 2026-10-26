import { useState } from '#imports'

export interface UserState {
  count: number
  lastUpdated: string
}

export const useSharedState = () => {
  // ⚠️ Important points:
  // By passing a function (factory function) instead of directly passing an object or value to the initial value,
  // Reliably prevents cross-request pollution (memory leaks and data mixing) during SSR.
  return useState<UserState>('phase2-shared-state', () => ({
    count: 0,
    lastUpdated: new Date().toLocaleTimeString(),
  }))
}
