# ESLint and Prettier

## Installation

Run this at the root of the workspace:

```bash
pnpm add -D eslint prettier
pnpm add -D eslint-config-prettier
```

## Configuration

### [eslint] Generate `eslint.config.js` file

Run this at the root of the workspace:

```bash
pnpm create @eslint/config@latest
```

> [!NOTE]
> If you generate this file itself as *.ts, you will need `jiti` separately when executing it.

for example, you can choose the following options:

```console
@eslint/create-config: v2.0.0
✔ What do you want to lint? · javascript
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ Which language do you want your configuration file be written in? · js
ℹ The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals, typescript-eslint, eslint-plugin-vue
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
☕️Installing...
✓ Lockfile passes supply-chain policies (verified 1m ago)
Progress: resolved 268, reused 0, downloaded 0, added 0, done

devDependencies:
+ @eslint/js ^10.0.1
+ eslint-plugin-vue ^10.10.0
+ globals ^17.11.0
+ typescript-eslint ^8.67.0

Already up to date
Done in 1.1s using pnpm v11.22.0
✔ Successfully created /workspaces/examples-js-vue/eslint.config.js file.
```

### [eslint] Add `eslint-config-prettier` to `eslint.config.js`

Modify `eslint.config.js` as follows:

```js
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  // ...
  eslintConfigPrettier,
])
```

### [prettier] Create `.prettierrc.yaml` file

I feel like yaml is better

```yaml
endOfLine: 'lf'
printWidth: 120
semi: false
singleQuote: false
trailingComma: 'es5'
useTabs: false
```

Create a separate `.prettierignore` file to specify files that are not to be formatted.

```ignore
# Ignore artifacts:
build
coverage

dist/
temp/
LICENSE.md
pnpm-lock.yaml
pnpm-workspace.yaml

# JSON is formatted using the `json-language-features`.
**/*.json
```

### Add scripts to `package.json`

I leave the formatting completely to prettier, so I don't use eslint's format.

```json
{
  "scripts": {
    "lint": "pnpm lint:eslint",
    "lint:eslint": "eslint . --cache",
    "format": "prettier --write --cache ."
  }
}
```

### VS Code settings

Prettier doesn't format `[json]` and `[markdown]`, leave it to another extension.

```json
{
  "[css][scss][sass]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript][typescript][vue]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.organizeImports": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "eslint.format.enable": false,
  "eslint.useFlatConfig": true
}
```

### [eslint] Nuxt and pnpm workspace

For pnpm workspaces, resolve package-local ESLint configurations and run ESLint on save:

```json
{
  "eslint.run": "onSave",
  "eslint.workingDirectories": [
    {
      "pattern": "./packages/*/"
    }
  ]
}
```

Use `oxlintRules` and disable the Oxfmt-conflicting `vue/script-indent` rule:

```js
import { oxlintRules, sharedRules, vueRules } from '@examples/eslint-config/rules'

export default withNuxt(frameworkPreset, ...sharedRules, ...vueRules, ...oxlintRules, {
  rules: { 'vue/script-indent': 'off' },
})
```

### [eslint] pnpm workspace

Create a shared configuration package:

```text
packages/
  eslint-config/
    index.js
    package.json
    rules.js
```

```json
// packages/eslint-config/package.json
{
  "name": "@examples/eslint-config",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./rules": "./rules.js"
  },
  "peerDependencies": {
    "eslint": "^10.10.0"
  },
  "dependencies": {
    "eslint-plugin-oxlint": "^1.83.0"
  }
}
```

Export the shared ESLint preset from `packages/eslint-config/index.js`:

```js
export default defineConfig([...sharedRules, ...vueRules, ...oxlintRules, eslintConfigPrettier])
```

Export project-independent rule overrides from `packages/eslint-config/rules.js`:

```js
import oxlint from 'eslint-plugin-oxlint'

export const oxlintRules = oxlint.configs['flat/all']

export const sharedRules = [
  // JavaScript, TypeScript, and Vue shared rules go here.
]

export const vueRules = [
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
    },
  },
  {
    files: ['**/pages/**/*.vue', '**/layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
```

Add the shared package and ESLint to each application package:

```json
{
  "devDependencies": {
    "@examples/eslint-config": "workspace:*",
    "eslint": "catalog:"
  }
}
```

Define package-local lint scripts:

```json
{
  "scripts": {
    "lint": "pnpm lint:oxlint && pnpm lint:eslint",
    "lint:eslint": "eslint ."
  }
}
```

Use the shared preset from each application configuration:

```js
// eslint.config.js
import config from '@examples/eslint-config'

export default config
```

For a framework preset that already registers ESLint plugins, import the shared rules and Oxc compatibility preset:

```js
import { oxlintRules, sharedRules } from '@examples/eslint-config/rules'
import frameworkPreset from 'eslint-config-framework'

export default [frameworkPreset, ...sharedRules, ...oxlintRules]
```

## Run

Run it using the following command:

```bash
pnpm lint
pnpm format

# auto fix
pnpm lint --fix
```

## Rules

### `vue/block-order`

Modify `eslint.config.js` as follows:

```js
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
    },
  },
```

## References

- [ESLint · Pluggable JavaScript linter](https://eslint.org/)
- [Prettier · Code formatting](https://prettier.io/docs/en/index.html)
- [Integrating with Linters · Prettier](https://prettier.io/docs/integrating-with-linters)
