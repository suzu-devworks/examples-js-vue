import { disabledRules, sharedRules, vueRules } from '@examples/eslint-config/rules'
import vuetify from 'eslint-config-vuetify'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  vuetify({
    ts: true,
  }),
  ...sharedRules,
  ...vueRules,
  ...disabledRules,
  {
    rules: {
      'vue/script-indent': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/no-multiple-template-root': 'off',
    },
  },
)
