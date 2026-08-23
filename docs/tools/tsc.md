# Typescript Compiler (tsc)

## Installation

Run this at the root of the workspace:

```bash
pnpm add -D typescript
pnpm add -D @types/node@26
```

## Configuration

### Root `tsconfig.json`

While the root `tsconfig.json` serves to enforce project configuration, it also enables type checking within the IDE.
Since we want to prioritize the latter for the time being, we will create a simple root tsconfig that merely references
 other configurations.

We will consider shared configurations at a later stage.

Create a `tsconfig.json` file as follows:

```json
{
  "files": [],
  "references": [
    {
      "path": "./packages/examples-vue-app"
    },
  ]
}
```

### Add scripts to root `package.json`

Register it to the script as follows:

```json
{
  "scripts": {
    "typecheck": "pnpm --filter \"./packages/**\" --parallel --if-present typecheck "
  }
}
```

The script names for type checking must be consistent.

### Add Vue Type Checking to Project `package.json`

You need to add a package:

```bash
pnpm add -D vue-tsc @vue/tsconfig
```

Use `vue-tsc` to script type checking in the project `package.json` as follows:

```json
{
  "scripts": {
    "typecheck": "vue-tsc --noEmit"
  }
}
```

## Run

Run it using the following command:

```bash
pnpm typecheck
```

## References

- [TSConfig Reference](https://www.typescriptlang.org/ja/tsconfig/)
- [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc)
