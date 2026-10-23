# examples-nuxt-app

Nuxt 4 application starter.

## Purpose

Try a minimal Nuxt 4 application setup with Pico.css and the Nuxt ESLint module.

## Stack

- Nuxt 4 / Vue 3
- [Pico.css](https://picocss.com/)
- TypeScript

## Getting started

Run from the repository root:

```sh
pnpm install
pnpm --filter examples-nuxt-app dev
```

## Learning agenda

Planned learning topics:

### Phase 1: Configuration and rendering fundamentals

- [x] Dynamically control runtime configuration: distinguish `runtimeConfig` (server-only vs. public values) from `appConfig`.
- [x] Configure rendering modes per route with `routeRules`: combine SSR and SPA pages.
- [x] Observe rendering behavior: inspect when HTML is generated on initial render and during client-side navigation.

### Phase 2: Nitro, data, and caching

- [ ] Create Nitro Server API handlers in `server/api/` and test calling them directly from the browser.
- [ ] Introduce Nitro Storage API for server-side caching and experiment with reducing API load.
- [ ] Fetch data on the client with `useFetch` and reuse it with `useNuxtData` to reduce API requests.
- [ ] Manage shared state safely across SSR and the client with `useState`, avoiding memory leaks.

### Phase 3: Extensibility and customization

- [ ] Inject initialization logic with Nuxt plugins for shared behavior and third-party library setup during SSR and CSR.
- [ ] Customize `useFetch` to automatically add common headers, such as API keys or request IDs.
- [ ] Customize `useFetch` to handle API errors such as 401 and 500 responses consistently, including navigation when needed.

### Phase 4: Authentication and advanced control

- [ ] Implement mock authentication APIs with Nitro for login, token issuance, and token validation.
- [ ] Manage tokens with `useCookie` so they can be accessed safely from both the server and client.
- [ ] Extend the custom `useFetch` composable to set the `Authorization` header using the `Bearer` authentication scheme.
- [ ] Restrict navigation with global or page-level route middleware and verify the unauthenticated-user guard.

## Notes

- ESLint setup: see [@examples/eslint-config](../eslint-config/README.md).
