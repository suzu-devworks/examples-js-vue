# examples-vue-shared

Vue 3 library of shared application behavior.

## Purpose

Try extracting reusable Vue 3 code (clipboard, dialog, loading, toast, opener, unsaved-changes)
into a standalone workspace package that other packages consume.

## Stack

- Vue 3 (composables)
- TypeScript

## Notes

- This is a source package, so consumers resolve its TypeScript files directly and do not need to build it first.
- `pnpm build` is available to generate declarations and JavaScript in `dist` when needed.
- There is no dev server.
- ESLint setup: see [@examples/eslint-config](../eslint-config/README.md).
