import { defineStore } from "pinia"

export interface Store {
  globalCount: number
}

// Option Stores style.
export const useGlobalCounterStore = defineStore("globalCount", {
  state: (): Store => ({ globalCount: 0 }),
  getters: {
    doubleCount: (state: Store): number => state.globalCount * 2,
  },
  actions: {
    incrementGlobal(): void {
      this.globalCount++
    },
  },
})
