# examples-vue-started

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Created project

### Create project

```console
$ npm init vue@latest examples-vue-started

Vue.js - The Progressive JavaScript Framework

✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add Cypress for End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes

Scaffolding project in /workspaces/apps/examples-vue-started...

Done. Now run:

  cd examples-vue-started
  npm install
  npm run dev

$ cd examples-vue-started
```

### Add packages

```shell
yarn add --dev typescript
yarn add --dev rimraf

# eslint & prettier
yarn add --dev eslint prettier npm-run-all
yarn add --dev eslint-config-prettier

# sass
yarn add --dev sass
```

### configure

```console
$ npm init @eslint/config

Need to install the following packages:
  @eslint/create-config@0.3.1
Ok to proceed? (y) y
✔ How would you like to use ESLint? · _problems_
✔ What type of modules does your project use? · _esm_
✔ Which framework does your project use? · _vue_
✔ Does your project use TypeScript? · No / _Yes_
✔ Where does your code run? · _browser_, _node_
✔ What format do you want your config file to be in? · _JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / _Yes_
✔ Which package manager do you want to use? · _yarn_
Installing eslint-plugin-vue@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest

```

_&#x2710; .eslintrc.js_

```diff
module.exports = {
+  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
+    "eslint-config-prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
}
```

_&#x2710; .prettierrc_

```json
{
  "endOfLine": "lf",
  "printWidth": 100,
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

_&#x2710; package.json_

```diff
{
  "name": "examples-vue-started",
  "version": "0.0.0",
+  "private": "true",
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check build-only",
    "preview": "vite preview --port 4173",
    "test:unit": "vitest --environment jsdom",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",
+    "clean": "rimraf dist/",
+    "lint:typecheck": "tsc",
+    "lint:prettier": "prettier . \"!test*\" --check --ignore-path .gitignore",
+    "lint:eslint": "eslint . --ext .vue,.js,.jsx,.mjs,.ts,.tsx,.mts --ignore-path .gitignore",
+    "lint": "run-p lint:*",
+    "lintfix:prettier": "yarn lint:prettier --write",
+    "lintfix:eslint": "yarn lint:eslint --fix",
+    "lintfix": "run-s lintfix:prettier lintfix:eslint "
  },
  ...
```
