# Nuxt UI

Nuxt UI is a modern Vue UI component library built on Reka UI, Tailwind CSS, and Tailwind Variants to ship beautiful
and accessible applications with 125+ production-ready components.

## Installation

### Installation via Nuxt4

Create a new project using the Nuxt UI template:

```bash
pnpm create nuxt@latest -t ui examples-nuxt-ui
```

You can choose from a variety of templates.

- [Use a Nuxt template](https://ui.nuxt.com/docs/getting-started/installation/nuxt#use-a-nuxt-template)

However, it appears there are some unnecessary files for placement within the pnpm workspace, so I will clean them up.

```bash
rm -fr examples-nuxt-ui/.github/
rm -rf examples-nuxt-ui/pnpm-workspace.yaml
rm -fr examples-nuxt-ui/pnpm-lock.yaml
rm -fr examples-nuxt-ui/.editorconfig
```

## What is `app.config.ts`？

In Nuxt UI, `app.config.ts` is the most important configuration file for "globally customizing" component designs
and themes (visuals).

Difference from `nuxt.config.ts`

Although often confused, the two serve completely different roles.

- `app.config.ts`:  
  UI, theme, and visual settings Fully exposed to the frontend (browser), allowing for safe, reactive changes.
  Cannot be overridden by environment variables.

- `nuxt.config.ts`:
   System-wide Nuxt configuration Configures the system infrastructure, such as module integration, SSR settings,
   and API secret keys (Runtime Config).

It seems you retrieve it using `useAppConfig`:

```ts
const { header, footer } = useAppConfig();
```

I see—so it's for screen-specific literals. That makes sense.
