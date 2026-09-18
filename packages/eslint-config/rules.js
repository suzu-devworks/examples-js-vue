import oxlint from 'eslint-plugin-oxlint'
import globals from 'globals'

export const oxlintRules = oxlint.configs['flat/all']

export const sharedRules = [
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
]

export const vueRules = [
  {
    files: ['**/*.vue'],
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
  {
    files: ['**/pages/**/*.vue', '**/layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
