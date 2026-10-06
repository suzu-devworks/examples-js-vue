# Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs
directly in your markup.
It allows for rapid UI development with a consistent design system.

## Installation

### Installation via Nuxt4

Create a new project using Nuxt:

```bash
pnpm create nuxt@latest examples-nuxt-tailwind
cd examples-nuxt-tailwind
```

Install required dependencies:

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

Configure Vite Plugin:

```ts
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
})
```

Import Tailwind CSS:

```css
/* app/assets/css/main.css */
@import 'tailwindcss';
```

Add the CSS file globally:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
})
```

With the current configuration, Tailwind's "preflight" initialization process completely resets all elements.

Building everything from scratch from this point on looks like a daunting task.

## Custom Initial Design

I'm putting some extra effort into the initial design without using any plugins, so please take a look for reference.

- [main.css](../packages/examples-nuxt-prisma/app/assets/css/main.css)
