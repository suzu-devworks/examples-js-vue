# Vuetify

## Installation

### Installation via create-vuetify

While the official documentation uses Nuxt commands to create a project,
I was able to create a Nuxt project using Vuetify commands, so I will outline that method here.

```bash
cd packages/
npm create vuetify
```

The questions have been selected as follows:

```console
 `$$$$$$$$$ii$$$`  .;T$$$$$$$$$:`
    T$$$$$$i$$$$`  .$$$l$$$$$$$:
     T$$$$ii$$$`  .$$$$ll$$$$$:
      `$$$l$$F`  :$$$$$$i$$$$`
        T$i$F   :$$$$$$$l$$F
         `:F   :$$$$$$$$i$:
          `   :$$$$$$$$l$`
             :$$$$$$$$j$`
             `$$$$$$$j$`
               T$$$$l$`
                `$$i$`
                 `T:

┌  Create Vuetify v3.2.1
│
◇  Start from a preset?
│  Start from scratch
│
◇  Project name:
│  examples-nuxt-vuetify
│
◇  Which framework would you like to use?
│  Nuxt
│
◇  Which CSS framework?
│  Tailwind CSS
│
◇  Select features to install: ↑/↓ to navigate, space to select, a to toggle all, enter to confirm
│  ESLint, Pinia
│
◇  Enable Client Hints? (Requires SSR)
│  Yes
│
◇  Do you want to install dependencies?
│  No
│
◇  Do you want to save these settings as a preset?
│  No
│
◇  Template downloaded
│
◇  Configuration applied
│
└  examples-nuxt-vuetify has been generated at examples-nuxt-vuetify

┌─Next steps───────────────────────────────────────────────────────────────────┐
│  cd examples-nuxt-vuetify                                                    │
│  pnpm install                                                                │
│  pnpm dev                                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
Docs  ⸱ Discord  ⸱ Support Us

Done in 1m 1.8s using pnpm v12.4.1
```

It will start up as shown in the console.

```bash
pnpm install
pnpm dev
```

## Unit Testing

Use Vitest and Nuxt Test Utils to test Vue components with the Nuxt runtime.

Run the following commands from the package root (`packages/examples-nuxt-vuetify`).

Install the test dependencies:

```bash
pnpm add -D @nuxt/test-utils vitest @vue/test-utils happy-dom
```

Add the test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Add `@nuxt/test-utils/module` to the `modules` array in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/test-utils/module'],
})
```

Create `vitest.config.ts`:

```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/nuxt/**/*.{test,spec}.ts'],
  },
})
```

Create `tests/nuxt/HelloWorld.spec.ts`:

```ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import HelloWorld from '../../app/components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('displays the Components link', async () => {
    const wrapper = await mountSuspended(HelloWorld)

    expect(wrapper.text()).toContain('Components')
  })
})
```

Run the tests once or in watch mode:

```bash
pnpm test
pnpm test:watch
```

Nuxt Test Utils is used so tests can mount components with the Nuxt runtime and its configured plugins, including Vuetify.
