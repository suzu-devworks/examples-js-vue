import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['**/__tests__/**/*.{test,spec}.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Files you want to exclude from coverage measurement
      exclude: ['node_modules/**', 'dist/**', '.nuxt/**', '.output/**', '**/*.d.ts', '**/*.config.*'],
    },
  },
})
