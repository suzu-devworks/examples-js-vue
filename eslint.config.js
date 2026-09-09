// eslint.config.js

import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import oxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },

  pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index', 'App'],
        },
      ],
    },
  },
  ...oxlint.configs['flat/all'],
  eslintConfigPrettier,
  globalIgnores(['**/node_modules/**', '**/dist/**', '**/build/**', '**/temp/**']),
])
