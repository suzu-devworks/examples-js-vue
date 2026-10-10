import rootConfig from '@examples/eslint-config'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(betterTailwindcss.configs.recommended, rootConfig, {
  settings: {
    'better-tailwindcss': {
      entryPoint: 'app/assets/css/main.css',
      attributes: ['^class$', '^className$', '^.*Class$'],
    },
  },
  rules: {
    'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
  },
})
