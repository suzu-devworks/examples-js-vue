<script setup lang="ts">
import type { NamedValue } from "@/types/shared"

// Unexpected tokens when using `import.meta.env` inside in string.
// "\u200b" is zero-width-space.
// https://ja.vitejs.dev/guide/env-and-mode.html#production-replacement
const defaultEnvs: NamedValue<string>[] = [
  { name: "import.meta\u200b.env.MODE", value: import.meta.env.MODE },
  { name: "import.meta\u200b.BASE_URL", value: import.meta.env.BASE_URL },
  { name: "import.meta\u200b.PROD", value: `${import.meta.env.PROD}` },
  { name: "import.meta\u200b.DEV", value: `${import.meta.env.DEV}` },
  { name: "import.meta\u200b.SSR", value: `${import.meta.env.SSR}` },
]

const fileEnvs: NamedValue<string>[] = [
  { name: "import.meta\u200b.VITE_ENV_FILENAME", value: import.meta.env.VITE_ENV_FILENAME },
  { name: "import.meta\u200b.VITE_VARIABLE_1", value: import.meta.env.VITE_VARIABLE_1 },
  { name: "import.meta\u200b.VITE_VARIABLE_2", value: import.meta.env.VITE_VARIABLE_2 },
  { name: "import.meta\u200b.VITE_VARIABLE_3", value: import.meta.env.VITE_VARIABLE_3 },
  { name: "import.meta\u200b.VITE_VARIABLE_4", value: import.meta.env.VITE_VARIABLE_4 },
  { name: "import.meta\u200b.VITE_VARIABLE_5", value: import.meta.env.VITE_VARIABLE_5 },
  { name: "import.meta\u200b.VUE_APP_VALUE", value: import.meta.env.VUE_APP_VALUE },
  { name: "import.meta\u200b.NON_VITE_VALUE", value: import.meta.env.NON_VITE_VALUE },
]
</script>

<template>
  <div>
    <h2>Env Variables</h2>
    <section>
      <h3>Defaults:</h3>
      <ul>
        <li v-for="(item, index) in defaultEnvs" :key="index">{{ item.name }}: {{ item.value }}</li>
      </ul>
    </section>
    <section>
      <h3>.env(dotenv):</h3>
      <ul>
        <li v-for="(item, index) in fileEnvs" :key="index">{{ item.name }}: {{ item.value }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-weight: bold;
  line-height: 2em;
}
</style>
