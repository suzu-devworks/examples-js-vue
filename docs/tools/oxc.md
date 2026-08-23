# oxc

It seems oxlint doesn't fully support Vue yet, so ESLint and Stylelint are still required.
I'll take it one step at a time.

## Installation

Run this at the root of the workspace:

```bash
pnpm add -D oxfmt
pnpm add -D oxlint oxlint-tsgolint
```

## Configuration

### [oxlint] Migrate from `eslint.config.js` file

Run this at the root of the workspace:

```bash
pnpm dlx @oxlint/migrate eslint.config.js --type-aware
```

The "112 Rule" was output.
As the output is extensive, I have omitted a portion of it below.

output tp `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["typescript", "vue", "unicorn"],
  "categories": {
    "correctness": "off"
  },
  "env": {
    "builtin": true
  },
  "rules": {
    // ...
  },
  "overrides": [
    {
      "files": ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
      "rules": {
        // ...
      },
      "env": {
        "browser": true
      }
    },
    {
      "files": ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
      "rules": {
        // ...
      }
    }
  ]
}
```

### [oxlint] Use in conjunction with ESLint

You need to add a package:

```bash
pnpm add -D eslint-plugin-oxlint
```

Modify `eslint.config.js` as follows:

```js
import oxlint from 'eslint-plugin-oxlint'

export default defineConfig([
  //...
  ...oxlint.configs['flat/all'],
])
```

### [oxfmt] Migrate from `.prettierrc.yaml`

Run this at the root of the workspace:

```bash
pnpm oxfmt --migrate=prettier
```

output tp `.oxfmtrc.json`:

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "endOfLine": "lf",
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "useTabs": false,
  "sortPackageJson": false,
  "ignorePatterns": [
    "build",
    "coverage",
    "dist/",
    "temp/",
    "LICENSE.md",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "**/*.json"
  ]
}
```

### [oxfmt] Sort imports

For now, I'll just stick with the recommended settings.

Modify `.oxfmtrc.json` as follows:

```json
{
  "sortImports": {}
}
```

If you want to make various changes, please refer to [oxfmt documentation](https://oxc.rs/docs/guide/usage/formatter/sorting.html).

### Add scripts to `package.json`

I leave the formatting completely to prettier, so I don't use eslint's format.

```json
{
  "scripts": {
    "lint": "pnpm lint:style & (pnpm lint:oxlint && pnpm lint:eslint)",
    "lint:eslint": "eslint . --cache",
    "lint:oxlint": "oxlint --type-aware . ",
    "lint:style": "stylelint --cache \"**/*.{css,scss,vue}\"",
    "format": "oxfmt --write ."
  }
}
```

### VS Code settings

Use [oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) extension to format on save.

Apparently, there used to be a way to control the execution order by specifying an array for `editor.codeActionsOnSave`, but since I’m not sure what the current status of that is, I’ll play it safe and specify it as an object instead.

The official documentation lists it as `always` but I think `explicit` is fine.

```json
{
  "[javascript][typescript][vue]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.format.oxc": "explicit", // run formatter first
      "source.fixAll.oxc": "explicit" // run lint fixes after
    },
    "editor.defaultFormatter": "oxc.oxc-vscode"
  }
}
```

When specifying `sortImports` with `oxfmt`, the behavior differs,
so I recommend against setting `"source.organizeImports": "explicit"`.

I've decided not to worry about the lack of a space after the CSS asset import.

## Run

Run it using the following command:

```bash
pnpm format
```

## References

- [oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)
