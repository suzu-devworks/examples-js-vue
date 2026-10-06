# examples-nuxt-shared

Nuxt layer for shared application behavior.

## Purpose

Try sharing common Nuxt behavior (Pinia setup and `examples-vue-shared` features) between Nuxt apps
by using a Nuxt layer.

## Stack

- Nuxt 4 (layer)
- Pinia (`@pinia/nuxt`)

## Related packages

- [examples-vue-shared](../examples-vue-shared/README.md)

## Usage

In the consuming app's `nuxt.config.ts` (see `examples-nuxt-vuetify`):

```ts
export default defineNuxtConfig({
  extends: ['../examples-nuxt-shared'],
})
```

## Notes

- This is a layer, so there is no dev server.
- ESLint setup: see [@examples/eslint-config](../eslint-config/README.md).
