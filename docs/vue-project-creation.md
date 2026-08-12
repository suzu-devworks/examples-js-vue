# Vue.js project creation

<!-- ---------------------------- -->

- [Create Vue project](#create-vue-project)
  - [🛠️ `create-vue`](#️-create-vue)
  - [🛠️ `create-vite`](#️-create-vite)
  - [🚧 create-quasar](#-create-quasar)
  - [🚧 `create-vuetify`](#-create-vuetify)
  - [🚧 ionic/cli](#-ioniccli)
- [Create Nuxt project](#create-nuxt-project)
  - [🚧 nuxi(v3)](#-nuxiv3)
  - [🚧 Nuxt UI](#-nuxt-ui)

## Create Vue project

### 🛠️ `create-vue`

This is the most basic project generation method, which is explained on the official website.

- [Quick Start | Vue.js](https://ja.vuejs.org/guide/quick-start.html)
- [vuejs/create-vue - https://github.com](<https://github.com/vuejs/create-vue>)

Run the following command from the command line:

```bash
pnpm create vue@latest my-vue-project
```

Options as of `create-vue@3.23.0`:

```console
┌  Vue.js - The Progressive JavaScript Framework
│
◆  Use TypeScript?
│  ● Yes / ○ No
◆  Select features to include in your project: (↑/↓ to navigate, space to select, a to toggle all, enter to confirm)
│  ◻ JSX Support
│  ◻ Router (SPA development)
│  ◻ Pinia (state management)
│  ◻ Vitest (unit testing)
│  ◻ End-to-End Testing
│  ◻ Linter (error prevention)
│  ◻ Prettier (code formatting)
│  ↑/↓ to navigate • Space: select • Enter: confirm
◆  Select experimental features to include in your project: (↑/↓ to navigate, space to select, a to toggle all, enter to confirm)
│  ◻ Replace Prettier with Oxfmt
│  ◻ Vue 3.6 (Release Candidate)
│  ↑/↓ to navigate • Space: select • Enter: confirm
◆  Skip all example code and start with a blank Vue project?
│  ○ Yes / ● No

Scaffolding project in /workspaces/examples-js-vue/temp/my-vue-project...
│
└  Done. Now run:

   cd my-vue-project
   pnpm install
   pnpm dev
```

You can start the development server by entering the command exactly as shown in the console.
However, if you are running it inside a Dev Container, please include the `--host` flag.

```bash
cd my-vue-project
pnpm install
pnpm dev --host 0.0.0.0
```

### 🛠️ `create-vite`

Vite is the official recommended build tool for Vue.js. Currently, Vite is the strongest option and recommended for creating Vue.js projects.

- [Scaffolding Your First Vite Project - Getting Started | Vite](https://ja.vite.dev/guide/)
- [create-vite - https://github.com/vitejs/vite](https://github.com/vuejs/vite/tree/main/packages/create-vite)

To create a Vue.js project with Vite, run the following command.

```bash
pnpm create vite@latest my-vite-project --template vue-ts
```

Options as of `create-vite@9.1.2`:

```console
│
◆  Install with pnpm and start now?
│  ● Yes / ○ No
◇  Scaffolding project in /workspaces/examples-js-vue/packages/my-vite-project...
│
◇  Installing dependencies with pnpm...
Scope: all 2 workspace projects
✓ Lockfile passes supply-chain policies (verified 43s ago)
../..                                    |  +48 +++++
../..                                    | Progress: resolved 72, reused 48, downloaded 0, added 0, done

dependencies:
+ vue 3.5.41

devDependencies:
+ @types/node 24.13.3 (26.2.0 is available)
+ @vitejs/plugin-vue 6.0.8
+ @vue/tsconfig 0.9.1
+ typescript 6.0.3 (7.0.2 is available)
+ vite 8.2.1
+ vue-tsc 3.3.9

Done in 625ms using pnpm v11.21.0
│
◇  Starting dev server...
$ vite

  VITE v8.2.1  ready in 129 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

If you are running it inside a Dev Container, please include the `--host` flag.

```bash
cd my-vite-project
pnpm dev --host 0.0.0.0
```

### 🚧 create-quasar

- <https://quasar.dev/start/quasar-cli>

```shell
# create.
$ yarn create quasar
$ cd my-quasar-project

# run.
$ yarn quasar dev
```

### 🚧 `create-vuetify`

<https://vuetifyjs.com/ja/getting-started/installation/#section-30a430f330b930c830fc30eb>

```bash
pnpm create vuetify
```

### 🚧 ionic/cli

- <https://ionicframework.com/docs/ja/cli>

```shell
# global install.
$ npm install -g @ionic/cli

# show available template.
$ ionic start --list --type=vue

# create.
$ ionic start my-ionic-project tabs --type vue
$ cd my-ionic-project

# run.
$ ionic serve
```

## Create Nuxt project

### 🚧 nuxi(v3)

- <https://v3.nuxtjs.org/getting-started/installation>

```shell
# create.
$ npx nuxi init my-nuxt-project
$ cd my-nuxt-project

# run.
$ npm run dev
```

### 🚧 Nuxt UI
