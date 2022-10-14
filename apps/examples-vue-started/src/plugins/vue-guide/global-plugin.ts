import type { App } from "vue"
import type { IPluginParts } from "@/types/vue-guide/"
import Keys from "./keys"

export function Configure(app: App) {
  // grobal inject.
  app.provide<IPluginParts>(Keys.PluginPartsKey, { say: () => "hello global!" })
}
