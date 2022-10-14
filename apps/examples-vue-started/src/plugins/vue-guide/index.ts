import type { App, Plugin } from "vue"
import { Configure as ConfigureComponent } from "./global-component"
import { Configure as ConfigurePlugin } from "./global-plugin"

export function createVueGuidePlugin(): Plugin {
  const plugin: Plugin = {
    install(app: App): void {
      ConfigureComponent(app)
      ConfigurePlugin(app)
    },
  }
  return plugin
}
