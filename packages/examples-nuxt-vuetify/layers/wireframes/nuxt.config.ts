import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const layerDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  $meta: {
    name: 'wireframes',
  },
  css: [join(layerDir, 'app/assets/wireframes.css')],
})
