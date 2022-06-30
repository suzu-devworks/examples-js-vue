# Get Started Vue.js 3 + Vuetify 3 (Beta) project

## The way to the present

### create project with create-vue

```console
> npm init vue@latest

Need to install the following packages:
  create-vue@3.2.2
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ Project name: … examples-ts-vue-vuetify
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add Cypress for End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in /workspaces/apps/examples-ts-vue-vuetify...

Done. Now run:

  cd examples-ts-vue-vuetify
  npm install
  npm run lint
  npm run dev

> cd examples-ts-vue-vuetify
> npm install
> npm run lint

```

### Add Vuetify use vue CLI

```console
> vue add vuetify

? Choose a preset: Vite Preview (Vuetify 3 + Vite)

```

### Suppress Errors TS27xx: 

**src/shims-vue.d.ts**

```ts:src/shims-vue.d.ts
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### ---

**vite.config.ts**

```ts
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8889,
    watch: {
      usePolling: true,
    }
  }
});

```