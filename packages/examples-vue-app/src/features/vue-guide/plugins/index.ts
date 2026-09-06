import type { App, Plugin } from 'vue'

import { Configure as ConfigureComponent } from '../components-in-depth/plugins/global-component'
import { Configure as ConfigureProvide } from '../components-in-depth/plugins/global-provide'

export function createVueGuide(): Plugin {
  const plugin: Plugin = {
    install(app: App): void {
      ConfigureComponent(app)
      ConfigureProvide(app)
    },
  }
  return plugin
}
