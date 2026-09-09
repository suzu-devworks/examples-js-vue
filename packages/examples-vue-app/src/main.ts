import './assets/main.css'
import './assets/article.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { createVueGuide } from './features/vue-guide'
import router from './router'

createApp(App)
  .use(router)
  .use(createPinia())
  // Vue Guide Plugin.
  .use(createVueGuide())
  // Mount the app to the DOM.
  .mount('#app')
