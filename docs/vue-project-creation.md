# Vue.js project creation

<!-- ---------------------------- -->

- [Create Vue project](#create-vue-project)
  - [🛠️ `create-vue`](#️-create-vue)
  - [🛠️ `create-vite`](#️-create-vite)
  - [🛠️ `create-quasar`](#️-create-quasar)
  - [🛠️ `create-vuetify`](#️-create-vuetify)
  - [🛠️ `@ionic/cli`](#️-ioniccli)
- [Create Nuxt project](#create-nuxt-project)
  - [🛠️ Nuxt(v4)](#️-nuxtv4)

## Create Vue project

### 🛠️ `create-vue`

This is the most basic project generation method, which is explained on the official website.

- [Quick Start | Vue.js](https://ja.vuejs.org/guide/quick-start.html)
- [vuejs/create-vue - https://github.com](<https://github.com/vuejs/create-vue>)

Create a new project:

```bash
pnpm create vue@latest
cd my-vue-project
```

Start the development server:

```bash
pnpm dev --host 0.0.0.0
```

If you are running it inside a Dev Container, please include the `--host` flag.

### 🛠️ `create-vite`

Vite is the official recommended build tool for Vue.js. Currently, Vite is the strongest option and recommended for creating Vue.js projects.

- [Scaffolding Your First Vite Project - Getting Started | Vite](https://ja.vite.dev/guide/)
- [create-vite - https://github.com/vitejs/vite](https://github.com/vuejs/vite/tree/main/packages/create-vite)

Create a new project:

```bash
pnpm create vite@latest --template vue-ts
cd examples-vue3-vite
```

Start the development server:

```bash
pnpm dev --host 0.0.0.0
```

If you are running it inside a Dev Container, please include the `--host` flag.

### 🛠️ `create-quasar`

Quasar is an open-source, Vue.js-based framework released under the MIT License that enables web developers to rapidly build responsive websites and applications in a variety of styles.
Its motto is: "Write your code once and simultaneously deploy it as a website, mobile app, and Electron app."

- [Quick Start - Quasar docs](https://quasar.dev/start/quick-start)

Create a new project:

```shell
pnpm create quasar@latest
cd examples-vue3-quasar
```

Start the development server:

```bash
pnpm dev --host 0.0.0.0
```

If you are running it inside a Dev Container, please include the `--host` flag.

### 🛠️ `create-vuetify`

Vuetify is a collection of pre-made components paired with powerful features such dynamic themes
, global defaults, application layouts, and more.
Its goal is to provide developers with all of the necessary tools to build rich and engaging user experiences.

- [Get started with Vuetify 4](https://vuetifyjs.com/ja/getting-started/installation/#section-30a430f330b930c830fc30eb)

Create a new project:

```bash
pnpm create vuetify
cd examples-vue3-vuetify
```

Start the development server:

```bash
pnpm dev --host 0.0.0.0
```

If you are running it inside a Dev Container, please include the `--host` flag.

### 🛠️ `@ionic/cli`

It appears to have been a mobile-first project, though it seems it failed to achieve dominance in the mobile space.
That said, it remains an active library that continues to receive updates.

- [Ionic CLI](https://ionicframework.com/docs/ja/cli)

Install the Ionic CLI globally:

```bash
pnpm add -g @ionic/cli
```

Set pnpm as the default package manager:

```bash
pnpm config set package-manager pnpm
```

Show available template:

```bash
ionic start --list --type=vue
```

Create a new project:

```bash
ionic start examples-ionic-app tabs --type vue
cd examples-ionic-app
```

Start the development server:

```bash
ionic serve --host 0.0.0.0
```

If you are running it inside a Dev Container, please include the `--host` flag.

## Create Nuxt project

### 🛠️ Nuxt(v4)

Nuxt's goal is to make web development intuitive and performant with a great Developer Experience in mind.

- [Installation · Get Started with Nuxt v4](https://nuxt.com/docs/4.x/getting-started/installation)

Run the following command from the command line:

Create a new project:

```bash
pnpm create nuxt@latest examples-nuxt4-app
cd examples-nuxt4-app
```

Start the development server:

```shell
pnpm dev --host 0.0.0.0
```
