# examples-vue-shared

Vue 3 library of shared application behavior.

## Purpose

Try extracting reusable Vue 3 code (clipboard, dialog, loading, toast, opener, unsaved-changes)
into a standalone workspace package that other packages consume.

## Stack

- Vue 3 (composables)
- TypeScript, built with `vue-tsc`

## Notes

- This is a library, so there is no dev server. Consumers run `build` through their own `build:deps` script.
- ESLint setup: see [@examples/eslint-config](../eslint-config/README.md).
