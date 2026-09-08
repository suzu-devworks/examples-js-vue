<script setup lang="ts">
import EnvList from '../components/EnvList.vue'
import type { NamedValue } from '../types'

// Unexpected tokens when using `import.meta.env` inside in string.
// https://github.com/vitejs/vite/issues/3304
// "\u200b" is zero-width-space.
const builtInConstants: NamedValue<string | boolean>[] = [
  { name: 'import.meta\u200b.env.MODE', value: import.meta.env.MODE },
  { name: 'import.meta\u200b.env.BASE_URL', value: import.meta.env.BASE_URL },
  { name: 'import.meta\u200b.env.PROD', value: import.meta.env.PROD },
  { name: 'import.meta\u200b.env.DEV', value: import.meta.env.DEV },
  { name: 'import.meta\u200b.env.SSR', value: import.meta.env.SSR },
]

const envVariables: NamedValue<string>[] = [
  { name: 'import.meta\u200b.env.VITE_SOME_KEY', value: import.meta.env.VITE_SOME_KEY },
  { name: 'import.meta\u200b.env.NON_VITE_SOME_KEY', value: import.meta.env.NON_VITE_SOME_KEY },
]
const dotenvValues: NamedValue<string>[] = [
  { name: 'import.meta\u200b.env.VITE_ENV_FILENAME', value: import.meta.env.VITE_ENV_FILENAME },
  { name: 'import.meta\u200b.env.VITE_VALUE_1', value: import.meta.env.VITE_VALUE_1 },
  { name: 'import.meta\u200b.env.VITE_VALUE_2', value: import.meta.env.VITE_VALUE_2 },
  { name: 'import.meta\u200b.env.VITE_VALUE_3', value: import.meta.env.VITE_VALUE_3 },
  { name: 'import.meta\u200b.env.NON_VITE_VALUE', value: import.meta.env.NON_VITE_VALUE },
]

const typedValues: NamedValue<string | number | boolean>[] = [
  { name: 'import.meta\u200b.env.VITE_APP_TITLE', value: import.meta.env.VITE_APP_TITLE },
  { name: 'import.meta\u200b.env.VITE_NUMBER_VALUE', value: import.meta.env.VITE_NUMBER_VALUE },
  { name: 'import.meta\u200b.env.VITE_BOOLEAN_VALUE', value: import.meta.env.VITE_BOOLEAN_VALUE },
]
</script>

<template>
  <main class="env-and-mode-view article-page">
    <header>
      <h1>Env Variables and Modes</h1>
      <p>Guide</p>
    </header>

    <section class="article-section">
      <h2>Built-in Constants</h2>
      <p>Some built-in constants are available in all cases.</p>

      <div class="article-example">
        <EnvList :items="builtInConstants" />
      </div>
    </section>

    <section class="article-section">
      <h2>Env Variables</h2>
      <p>
        Vite uses <code>dotenv</code> to load additional environment variables from files in the environment directory.
      </p>

      <div class="article-example">
        <h3>Environment Variables</h3>
        <EnvList :items="envVariables" />
      </div>

      <div class="article-example">
        <h3>dotenv(.env)</h3>
        <EnvList :items="dotenvValues" />
      </div>
    </section>

    <section class="article-section">
      <h2>IntelliSense for TypeScript</h2>
      <p>
        You can benefit from IntelliSense by creating <code>vite-env.d.ts</code> or <code>env.d.ts</code> in the
        <code>src</code> directory and extending <code>ImportMetaEnv</code>.
      </p>
      <p>
        <strong>But keep in mind that the actual values are <code>string</code>.</strong>
      </p>

      <div class="article-example">
        <EnvList :items="typedValues" />
      </div>
    </section>
  </main>
</template>
