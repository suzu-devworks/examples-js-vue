# stylelint

## Installation

Run this at the root of the workspace:

```bash
pnpm create stylelint@latest
```

The execution result looks like this:

```console
┌   create-stylelint
│
◇  This tool will: ───────────────────────────────────╮
│                                                     │
│  Create a stylelint.config.mjs file containing:     │
│                                                     │
│    /** @type {import("stylelint").Config} */        │
│    export default {                                 │
│      extends: ["stylelint-config-standard"]         │
│    };                                               │
│                                                     │
│  Add the related dependencies using:                │
│                                                     │
│    pnpm add -D stylelint stylelint-config-standard  │
│                                                     │
├─────────────────────────────────────────────────────╯
│
◇  Continue?
│  Yes
│
◇  Created config file
│
◇  Added dependencies
│
◆  Stylelint is ready!
│
◇  Next steps: ─────────────────────────────────╮
│                                               │
│  Lint your CSS files:                         │
│                                               │
│    pnpm dlx stylelint "**/*.css"              │
│                                               │
│  Customize your config:                       │
│                                               │
│  - https://stylelint.io/user-guide/customize  │
│                                               │
├───────────────────────────────────────────────╯
│
│  Support Stylelint:
│
│  - https://github.com/sponsors/stylelint
│  - https://opencollective.com/stylelint
│
└  Done!
```

`stylelint.config.mjs` is output:

```js
/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
}
```

## Configuration

### For Vue3

You need to add a package:

```bash
pnpm add -D stylelint-config-standard-vue
```

Modify `stylelint.config.mjs` as follows:

```js
/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
}
```

### For SCSS

You need to add a package:

```bash
pnpm add -D stylelint-config-standard-scss
```

Modify `stylelint.config.mjs` as follows:

```js
/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
    },
  ],
}
```

### Property order

It is preferable that properties are ordered according to rules.
There are various settings for the sort order,
but here we will use [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order).

You need to add a package:

```bash
pnpm add -D stylelint-order stylelint-config-recess-order
```

Modify `stylelint.config.mjs` as follows:

```js
/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
    },
  ],
}
```

### Add scripts to `package.json`

I leave the formatting completely to prettier, so I don't use eslint's format.

```json
{
  "scripts": {
    "lint": "pnpm lint:style && pnpm lint:eslint",
    "lint:eslint": "eslint . --cache",
    "lint:style": "stylelint --cache \"**/*.{css,scss}\""
  }
}
```

### VS Code settings

To lint, enter the following settings:

```json
{
  "[css][scss][sass]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.stylelint": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "stylelint.validate": ["css", "scss", "vue"]
}
```

Set the following settings if there are duplicate errors:

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false
}
```

## Run

Run it using the following command:

```bash
pnpm lint:style

# auto fix
pnpm lint:style --fix
```

## Rules

- [`alpha-value-notation`](https://stylelint.io/user-guide/rules/alpha-value-notation/)

## References

- [stylelint](https://stylelint.io/)
