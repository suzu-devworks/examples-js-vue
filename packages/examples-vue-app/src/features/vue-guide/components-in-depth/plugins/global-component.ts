import type { App } from 'vue'

import MyComponent from '../components/registration/MyComponent.vue'
import RenderComponent from '../components/registration/render-component.tsx'

export function Configure(app: App) {
  app.component('GlobalRenderComponent', RenderComponent)
  app.component('GlobalMyComponent', MyComponent)
}
