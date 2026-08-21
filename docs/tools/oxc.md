# oxc

It seems oxlint doesn't fully support Vue yet, so ESLint and Stylelint are still required.
I'll take it one step at a time.

First, I'll replace Prettier.

## Installation

```bash
pnpm add -D oxfmt
```

## Configuration

### Migrate from `.prettierrc.yaml`

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

### Add scripts to `package.json`

I leave the formatting completely to prettier, so I don't use eslint's format.

```json
{
  "scripts": {
    "format": "oxfmt --write ."
  }
}
```

### VS Code settings

Use [oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) extension to format on save.

```json
{
  "[javascript][typescript][vue]": {
    "editor.codeActionsOnSave": {
      "source.format.oxc": "always", // run formatter first
      "source.fixAll.oxc": "always" // run lint fixes after
    },
    "editor.defaultFormatter": "oxc.oxc-vscode"
  }
}
```

## Run

```bash
pnpm format
```

## References

- [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)
