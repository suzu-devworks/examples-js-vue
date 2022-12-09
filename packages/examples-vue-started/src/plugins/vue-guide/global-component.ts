import type { App } from "vue"
import { h } from "vue"

export function Configure(app: App) {
  app.component("global-component", {
    props: { title: String },
    render() {
      return h("p", { class: "global-component" }, this.title)
    },
  })
}
