import type { InjectionKey } from "vue"
import type { IPluginParts } from "@/types/vue-guide/"

// define keys.
const PluginPartsKey = Symbol("IPluginParts") as InjectionKey<IPluginParts>

export default { PluginPartsKey }
