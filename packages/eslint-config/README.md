# @examples/eslint-config

Shared ESLint flat config for the packages in this workspace.

## Purpose

Try sharing one ESLint setup (ESLint flat config, typescript-eslint, eslint-plugin-vue,
Prettier compatibility, and oxlint de-duplication) across multiple packages.

## Stack

- ESLint flat config (`defineConfig`)
- typescript-eslint / eslint-plugin-vue
- eslint-config-prettier
- eslint-plugin-oxlint (turns off the rules oxlint already covers)

## Exports

| Entry                           | Description                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `@examples/eslint-config`       | Complete config (recommended sets + shared rules + Vue rules + oxlint + Prettier) |
| `@examples/eslint-config/rules` | Individual parts: `sharedRules`, `vueRules`, `oxlintRules`                        |

## Usage

### 1. Add the dependency

```sh
pnpm --filter <package-name> add -D @examples/eslint-config@workspace:* eslint
```

### 2. Use as-is (plain Vue / TypeScript packages)

`eslint.config.mjs`:

```js
import rootConfig from '@examples/eslint-config'

export default rootConfig
```

### 3. Compose with another config (Nuxt, Vuetify, etc.)

Use only the parts you need. See `examples-nuxt-vuetify`.

```js
import { oxlintRules, sharedRules, vueRules } from '@examples/eslint-config/rules'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(...sharedRules, ...vueRules, ...oxlintRules)
```

### 4. Add scripts

```json
{
  "lint": "pnpm lint:oxlint && pnpm lint:eslint",
  "lint:eslint": "eslint .",
  "lint:oxlint": "oxlint --type-aware ."
}
```

## Notes

- `eslint` is a peer dependency, so each consuming package installs it itself.
- Run oxlint first. `oxlintRules` disables the ESLint rules that oxlint already checks.
