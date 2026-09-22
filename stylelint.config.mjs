/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue', 'stylelint-config-recess-order'],
  overrides: [
    {
      files: ['**/tailwind.css'],
      rules: {
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['apply', 'custom-variant', 'reference', 'source', 'theme', 'utility'],
          },
        ],
        'custom-property-pattern': null,
        // url() notation breaks `@reference` resolution across files in Tailwind CSS v4
        'import-notation': 'string',
      },
    },
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
      rules: {
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['apply', 'custom-variant', 'reference', 'source', 'theme', 'utility'],
          },
        ],
      },
    },
  ],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/temp/**'],
  rules: {
    'alpha-value-notation': 'number',
    'comment-empty-line-before': ['always', { except: ['first-nested'], ignore: ['after-comment'] }],
    // Allows BEM naming convention (kebab-case + __element + --modifier)
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true, // When supporting nesting (&__element) such as Sass
      },
    ],
  },
}
