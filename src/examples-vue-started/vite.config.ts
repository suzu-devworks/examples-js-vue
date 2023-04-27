import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // https: {
    //   key: fileURLToPath(new URL("./.https/localhost.key", import.meta.url)),
    //   cert: fileURLToPath(new URL("./.https/localhost.crt", import.meta.url)),
    // },
  },
  //envPrefix: "VUE_APP",
})
