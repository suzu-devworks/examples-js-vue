import type { App, Plugin } from "vue"
import { h } from "vue"

export function createVueGuidePlugin(): Plugin {
  const plugin: Plugin = {
    install(app: App): void {
      app.component("global-component", {
        props: { title: String },
        render() {
          return h("p", { class: "global-component" }, this.title)
        },
      })
    },
  }
  return plugin
}
