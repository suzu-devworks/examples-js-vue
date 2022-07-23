# Getting started Vue 3

- [インストール - Vue.js](https://v3.ja.vuejs.org/guide/installation.html)

<!-- -------------------- -->

## create-vue

Create project.

```console
$ npm init vue@latest

Need to install the following packages:
  create-vue@3.3.0
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ Project name: … examples-ts-vue-started
✔ Add TypeScript? … No / _Yes_
✔ Add JSX Support? … No / _Yes_
✔ Add Vue Router for Single Page Application development? … No / _Yes_
✔ Add Pinia for state management? … No / _Yes_
✔ Add Vitest for Unit Testing? … _No_ / Yes
✔ Add Cypress for both Unit and End-to-End testing? … _No_ / Yes
✔ Add ESLint for code quality? … No / _Yes_
✔ Add Prettier for code formatting? … No / _Yes_

Scaffolding project in /workspaces/apps/examples-ts-vue-started...

Done. Now run:

  cd examples-ts-vue-started
  npm install
  npm run lint
  npm run dev

```

Created `packages.json`:

```json
{
  "name": "examples-ts-vue-started",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check build-only",
    "preview": "vite preview --port 4173",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
  },
  "dependencies": {
    "pinia": "^2.0.16",
    "vue": "^3.2.37",
    "vue-router": "^4.1.2"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.1.0",
    "@types/node": "^16.11.45",
    "@vitejs/plugin-vue": "^3.0.1",
    "@vitejs/plugin-vue-jsx": "^2.0.0",
    "@vue/eslint-config-prettier": "^7.0.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "@vue/tsconfig": "^0.1.3",
    "eslint": "^8.5.0",
    "eslint-plugin-vue": "^9.0.0",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.5.1",
    "typescript": "~4.7.4",
    "vite": "^3.0.1",
    "vue": "^3.2.37",
    "vue-tsc": "^0.38.8"
  }
}
```

<!-- -------------------- -->

## Vite

Create project.

```console
$ yarn create vite examples-ts-vue-started --template vue-ts

yarn create v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-vite@3.0.0" with binaries:
      - create-vite
      - cva

Scaffolding project in /workspaces/apps/examples-ts-vue-started...

Done. Now run:

  cd examples-ts-vue-started
  yarn
  yarn dev

Done in 3.46s.
```

Created `packages.json`:

```json
{
  "name": "examples-ts-vue-started",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.0.0",
    "typescript": "^4.6.4",
    "vite": "^3.0.0",
    "vue-tsc": "^0.38.4"
  }
}
```

<!-- -------------------- -->

## Vue CLI

Install.

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Create project.

```console
$ vue create examples-ts-vue-started

Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, PWA, Router, Vuex, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In package.json
? Save this as a preset for future projects? No
? Pick the package manager to use when installing dependencies: Yarn


Vue CLI v5.0.8
✨  Creating project in /workspaces/apps/examples-js-vue-started.
⚙️  Installing CLI plugins. This might take a while...

yarn install v1.22.19
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...

success Saved lockfile.
Done in 508.63s.
🚀  Invoking generators...
📦  Installing additional dependencies...

yarn install v1.22.19
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 245.86s.
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project examples-js-vue-started.
👉  Get started with the following commands:

 $ cd examples-js-vue-started
 $ yarn serve

```

Created `packages.json`:

```json
{
  "name": "examples-js-vue-started",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.8.3",
    "register-service-worker": "^1.7.2",
    "vue": "^3.2.13",
    "vue-class-component": "^8.0.0-0",
    "vue-router": "^4.0.3",
    "vuex": "^4.0.0"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-pwa": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-typescript": "~5.0.0",
    "@vue/cli-plugin-vuex": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "@vue/eslint-config-typescript": "^9.1.0",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.0.3",
    "prettier": "^2.4.1",
    "sass": "^1.32.7",
    "sass-loader": "^12.0.0",
    "typescript": "~4.5.5"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "@vue/typescript/recommended",
      "plugin:prettier/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 2020
    },
    "rules": {}
  },
  "browserslist": ["> 1%", "last 2 versions", "not dead", "not ie 11"]
}
```
