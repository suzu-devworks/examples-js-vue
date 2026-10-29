# Vitest

## Installation

Add the Nuxt/Vue test dependencies to the Nuxt package from the workspace root:

```bash
pnpm --filter examples-nuxt-app add -D vitest @nuxt/test-utils @vue/test-utils happy-dom
```

## Configuration

Create `packages/examples-nuxt-app/vitest.config.ts`:

```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['**/__tests__/**/*.{test,spec}.ts'],
  },
})
```

Add test scripts to the package's `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

## Run

Run all tests or start watch mode from the workspace root:

```bash
pnpm --filter examples-nuxt-app test
pnpm --filter examples-nuxt-app test:watch
```

Run one test file:

```bash
pnpm --filter examples-nuxt-app exec vitest run app/pages/__tests__/index.spec.ts
```

## Test placement

Put tests in an `__tests__` directory inside the source file's directory:

```text
app/
└── pages/
    ├── index.vue
    └── __tests__/
        └── index.spec.ts
```

## Basic test

```ts
import { describe, expect, it } from 'vitest'

describe('sum', () => {
  it('adds two numbers', () => {
    expect(1 + 2).toBe(3)
  })
})
```

## Nuxt component test

`app/pages/__tests__/index.spec.ts`:

```ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Page from '../index.vue'

describe('home page', () => {
  it('renders the heading', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.get('h1').text()).toBe('Welcome to Nuxt 4 Deep Dive')
  })
})
```
