import { globalIgnores } from 'eslint/config'

import rootConfig from '../../eslint.config.js'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  rootConfig,
  // your custom flat configs go here, for example:
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   rules: {
  //     'no-console': 'off' // allow console.log in TypeScript files
  //   }
  // },
  // {
  //   ...
  // }
  globalIgnores(['**/.nuxt/**', '**/.output/**'])
)
