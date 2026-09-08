import type { Ref } from 'vue'

export interface ILocation {
  readonly location: Ref<string>
  updateLocation: () => void
}
