# Nuxt UI

Nuxt UI is a modern Vue UI component library built on Reka UI, Tailwind CSS, and Tailwind Variants to ship beautiful
and accessible applications with 125+ production-ready components.

## Installation

### Installation via Nuxt4

Create a new project using the Nuxt UI template:

```bash
pnpm create nuxt@latest -t ui examples-nuxt-ui
```

However, it appears there are some unnecessary files for placement within the pnpm workspace, so I will clean them up.

```bash
rm -fr examples-nuxt-ui/.github/
rm -rf examples-nuxt-ui/pnpm-workspace.yaml
rm -fr examples-nuxt-ui/pnpm-lock.yaml
rm -fr examples-nuxt-ui/.editorconfig

```
