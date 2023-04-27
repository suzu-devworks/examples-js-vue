import { createApp } from "vue"
import { createPinia } from "pinia"
import { createVueGuidePlugin } from "@/plugins/vue-guide"

import App from "./App.vue"
import router from "./router"

import "./assets/main.scss"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(createVueGuidePlugin())

app.mount("#app")
