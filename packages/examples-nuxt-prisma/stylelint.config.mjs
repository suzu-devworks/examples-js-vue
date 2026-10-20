export default {
  extends: ['../../stylelint.config.mjs'],

  rules: {
    // for Tailwind v4 CSS and custom at-rules
    'at-rule-prelude-no-invalid': [
      true,
      {
        ignoreAtRules: ['tailwind', 'theme', 'utility', 'variant', 'apply'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'custom-variant', 'reference', 'source', 'theme', 'utility'],
      },
    ],
    // url() notation breaks `@reference` resolution across files in Tailwind CSS v4
    'import-notation': 'string',
  },
}
