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

- [x] Step 1: Dynamically control runtime configuration:
      distinguish `runtimeConfig` (server-only vs. public values) from `appConfig`.
- [x] Step 2: Configure rendering modes per route with `routeRules`: combine SSR and SPA pages.
- [x] Step 3: Observe rendering behavior: inspect when HTML is generated on initial render and during client-side navigation.

### Phase 2: Nitro Engine, Data, and Caching

- [x] Step 4: Create Nitro Server API handlers in `server/api/` and test calling them directly from the browser.
- [x] Step 5: Introduce Nitro Storage API for server-side caching and experiment with reducing API load.
- [x] Step 6: Fetch data on the client with `useFetch` and reuse it with `useNuxtData` to reduce API requests.
- [x] Step 7: Manage shared state safely across SSR and the client with `useState`, avoiding memory leaks.

### Phase 3: Extensibility and customization

- [x] Step 8: Inject initialization logic with Nuxt plugins for shared behavior
      and third-party library setup during SSR and CSR.
- [x] Step 9: Customize `useFetch` to automatically add common headers, such as API keys or request IDs.
- [ ] Step 10: Customize `useFetch` to handle API errors such as 401 and 500 responses consistently,
      including navigation when needed.

### Phase 4: Authentication and advanced control

- [ ] Step 11: Implement mock authentication APIs with Nitro for login, token issuance, and token validation.
- [ ] Step 12: Manage tokens with `useCookie` so they can be accessed safely from both the server and client.
- [ ] Step 13: Extend the custom `useFetch` composable to set the `Authorization` header
      using the `Bearer` authentication scheme.
- [ ] Step 14: Restrict navigation with global or page-level route middleware and verify the unauthenticated-user guard.

## Notes

- ESLint setup: see [@examples/eslint-config](../eslint-config/README.md).
