/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue', 'stylelint-config-recess-order'],
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
    },
  ],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/temp/**'],
  rules: {
    'alpha-value-notation': 'number',
    'comment-empty-line-before': ['always', { except: ['first-nested'], ignore: ['after-comment'] }],
  },
}
