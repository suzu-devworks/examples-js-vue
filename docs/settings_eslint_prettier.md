# Settings ESLint and Prettier

## Commons

### Add Packages

```shell
yarn add --dev typescript
yarn add --dev rimraf

yarn add --dev eslint prettier
yarn add --dev eslint-config-prettier
```

### Generate `.eslintrc.js`

```console
$ npm init @eslint/config

Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y) y
✔ How would you like to use ESLint? · _problems_
✔ What type of modules does your project use? · _esm_
✔ Which framework does your project use? · _vue_
✔ Does your project use TypeScript? · No / _Yes_
✔ Where does your code run? · _browser_, _node_
✔ What format do you want your config file to be in? · _JavaScript_
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
✔ Would you like to install them now? · No / _Yes_
✔ Which package manager do you want to use? · yarn
Installing eslint-plugin-vue@latest,
...
```

### Configuration files

#### `.eslintrc.js`

```diff_js
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
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
```

#### `.eslintignore`

```properties
## .eslintignore default
# node_modules/
# .*
#!.eslintrc.*

## .prettierignore default
# **/.git
# **/.svn
# **/.hg
# **/node_modules

## default
node_modules
.*
!.eslintrc.*

## Vue
dist
dist-ssr
*.local

##
/src/*.js
/src/*.js.map
```

#### `.prettierrc`

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

#### `.prettierignore`

Share with `.eslintignore`.

`.gitignore` has some necessary things such as dotfile, so I will separate it.

### Configuration npm Scripts

#### `package.json`

```json
{
  "scripts": {
    // ...
    "clean": "rimraf dist",
    "lint": "run-p lint:*",
    "lint:typecheck": "tsc",
    "lint:prettier": "prettier . \"!test*\" --check --ignore-path .eslintignore",
    "lint:eslint": "eslint .",
    "fix": "run-s fix:eslint fix:prettier",
    "fix:prettier": "yarn lint:prettier --write",
    "fix:eslint": "yarn lint:eslint --fix"
  }
  // ...
}
```

#### Run

```shell
## linting.
yarn lint

## formatting and linting
yarn fix

## clean
yarn clean
```

## Settings for Vue 3

```shell

```

## Settings for Nuxt 3

### Add Packages

```shell
yarn add --dev @nuxtjs/eslint-config-typescript
```

### Configuration files

#### `.eslintrc.js`

```diff_js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
+    "@nuxtjs/eslint-config-typescript",
    "eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
```
