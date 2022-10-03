# Settings UI Quasar

## References

- [Vite plugin for Quasar](https://quasar.dev/start/vite-plugin)

## Commons

### Add Packages

```
yarn add quasar @quasar/extras
yarn add -D @quasar/vite-plugin sass@1.32.12

```

## Nuxt3

### Create plugins

**`plugins/quasar.ts`**

```ts
/* eslint-disable import/no-duplicates */
import { Quasar } from "quasar";
import * as components from "quasar";
import * as directives from "quasar";
import quasarLang from "quasar/lang/ja";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    config: {},
    components,
    directives,
    plugins: {},
    lang: quasarLang,
  });
});
```

### Configuration files

**`nuxt.config.ts`**

```diff_ts
import { defineNuxtConfig } from "nuxt"
+ import { quasar } from "@quasar/vite-plugin"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    strict: true,
  },
 +  vite: {
 +    plugins: [
 +      quasar({
 +        autoImportComponentCase: "pascal",
 +        sassVariables: "assets/quasar.variables.scss",
 +      }),
 +    ],
 +  },
})

```


ケバブパスカル

(</?)q-([a-z])([a-z]+)(-([a-z])(a-z)+)?
$1Q\U$2$3\U$5$6

(?<=subexpression)
((?<=)|)

(</?q)|-([a-z])
\U$1\U$2
