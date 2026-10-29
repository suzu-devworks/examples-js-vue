import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['**/__tests__/**/*.{test,spec}.ts'],
  },
})
