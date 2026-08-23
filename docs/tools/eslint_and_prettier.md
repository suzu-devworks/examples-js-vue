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
          order: [['script', 'template'], 'style'],
        },
      ],
    },
  },
```

## References

- [ESLint · Pluggable JavaScript linter](https://eslint.org/)
- [Prettier · Code formatting](https://prettier.io/docs/en/index.html)
- [Integrating with Linters · Prettier](https://prettier.io/docs/integrating-with-linters)
