# Quasar Framework

Quasar Framework is a Vue.js-based framework that allows developers to create responsive websites, PWAs,
mobile apps, and Electron apps using a single codebase. It provides a rich set of UI components, utilities,
and a powerful CLI to streamline the development process.

## Installation

### Installation via Nuxt4

To install Quasar Framework in a Nuxt4 project, you can use the following steps:

Create a new project using Nuxt:

```bash
pnpm create nuxt@latest examples-nuxt-quasar
cd. examples-nuxt-quasar
```

Add `nuxt-quasar-ui` dependency to your project

```bash
pnpm dlx nuxi@latest module add quasar
```

Add developer tools as needed:

```bash
pnpm add -D @quasar/vite-plugin@latest sass-embedded@^1.93.2
```

When you add it via a Nuxt module, `nuxt.config.ts` should be updated, so please verify that.

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
})
```

It should run with the current configuration.

```bash
pnpm dev
```

However, since it's still using the default Nuxt template, it's hard to tell what's going on.

## Porting from a Quasar template

First, create a project using a Quasar template elsewhere.

```bash
pnpm create quasar@latest
```

I am giving it some thought.

### Plan

### Copy `src/` to `app/` directory

Copy the following files to the app directory:

- `src/assets/quasar-logo-vertical.svg`
- `src/components/EssentialLink.vue`
- `src/css/app.scss`
- `src/css/quasar.variables.scss`
- `src/pages/index/(index).vue`
- `src/pages/index/second.vue`
- `src/pages/[...path].vue`
- `src/pages/index.vue`

I thought about bringing in the `stores/` directory, but I don't use it and I'm using the Quasar wrapper,
so I excluded it.

```ts
import { defineStore } from '#q-app'
```

`router/` is replaced by the `pages/` directory in Nuxt, so no migration is required.

In my case, SPF (*.vue) has the script at the beginning, so I am correcting it.

### app.vue settings

Quasar's app.vue is simple, but
Nuxt uses the `NuxtPage` component instead of `router-view`.

```vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <!-- <router-view /> -->
    <NuxtPage />
  </div>
</template>
```

### Change pages

- `src/pages/index/(index).vue` causes an error in Nuxt, so change it to `pages/index/index.vue`.
- The `import` statement in `src/pages/index.vue` is not necessary,
  but this file will be used as a layout later, so I will put it on hold.

### Using css

Import the CSS file in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ['@/css/app.scss'],
  quasar: {
    sassVariables: '@/css/quasar.variables.scss',
  },
})

```

`quasar.variables.scss` is a little special and is used to override Quasar's theme variables.
Unlike regular CSS files, they must be processed by Quasar's build process.

```ts
export default defineNuxtConfig({
  quasar: {
    sassVariables: '@/css/quasar.variables.scss',
  },
})
```

### `index.html` to `nuxt.config.ts`

Contents written in Quasar's `index.html` must be migrated to `nuxt.config.ts` in Nuxt.
 For example, meta tags and link tags are set in the `head` property.

```ts
import pkg from './package.json' with { type: 'json' }

export default defineNuxtConfig({
  app: {
    head: {
      title: pkg.productName || 'Quasar App',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: pkg.description || 'My Quasar Application' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-tap-highlight', content: 'no' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/icons/favicon-128x128.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' },
      ],
    },
  },
})
```

While I was at it, I made it possible to display the contents of `package.json`.

```json
{
  "name": "examples-nuxt-quasar",
  "type": "module",
  "description": "A Quasar + Nuxt 4 Project",
  "productName": "Quasar + Nuxt 4 App"
}
```

Putting this on hold because it stops working properly in the next step.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';<% if (ctx.dev) { %> connect-src 'self' ws://localhost:*; worker-src 'self' blob:;<% } %>"
/>
```

### Quasar run

Now that the Quasar configuration is complete, start the development server and verify that it is working correctly.

```bash
pnpm dev
```

## Additional settings

### Layout

Since `src/pages/index.vue` appears to be intended for layout purposes, I will convert it into a `NuxtLayout`.
I will move the file to the `src/layouts` folder and rename it to something like `default.vue`.

I will change `<router-view />` to `<slot />`.

```vue
<template>

  <q-page-container>
    <!-- <router-view /> -->
    <slot />
  </q-page-container>
</template>
```

Organize the imports.

You can remove `ref` and `EssentialLink`, but `EssentialLinkProps` will remain.

```ts
import type { EssentialLinkProps } from '@/components/EssentialLink.vue'
```

I'll make a few changes to app.vue.

```vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <!-- <router-view /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

### eslint configuration

First, let's set up ESLint for Nuxt:

```bash
pnpm dlx nuxt module add eslint
```

This ensures that `.nuxt/eslint.config.mjs` is generated during the build process and the ESLint configuration is applied.
However, since this may not always be reflected in real-time linting within VS Code extensions or the editor itself,
you also need to provide a configuration file—such as `eslint.config.mjs` at the project root.

Configure it as follows, including any shared workspace settings:

```js
import rootConfig from '../../eslint.config.js'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  rootConfig
  // your custom flat configs go here, for example:
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   rules: {
  //     'no-console': 'off' // allow console.log in TypeScript files
  //   }
  // },
  // {
  //   ...
  // }
)
```

Please add the ESLint configuration to package.json as well, if necessary.

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```
