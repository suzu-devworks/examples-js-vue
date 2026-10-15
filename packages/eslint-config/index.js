import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

import { disabledRules, sharedRules, vueRules } from './rules.js'

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  ...sharedRules,
  ...vueRules,
  ...disabledRules,
  globalIgnores(['**/node_modules/**', '**/dist/**', '**/build/**', '**/temp/**']),
])
