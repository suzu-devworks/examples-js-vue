<script setup lang="ts">
interface StepLink {
  path: string
  label: string
}

interface PhaseGroup {
  phaseTitle: string
  steps: StepLink[]
}

const agendaMenu: PhaseGroup[] = [
  {
    phaseTitle: 'Phase 1: Configuration and rendering fundamentals',
    steps: [
      { path: '/phase1/config-test', label: 'Step 1: Dynamic control of runtime and configuration' },
      { path: '/phase1/rendering-ssr', label: 'Step 2: Rendering Verification: SSR (ssr: true)' },
      { path: '/phase1/rendering-spa', label: 'Step 2: Rendering Verification: SPA (ssr: false)' },
      { path: '/phase1/rendering-verification', label: 'Step 3: Verifying behavior for each rendering mode' },
    ],
  },
]
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <!-- Left side -->
        <ul>
          <li>
            <a href="/" class="brand-link">
              <strong>Nuxt 4 Deep Dive</strong>
            </a>
          </li>
        </ul>

        <!-- Right side -->
        <ul>
          <li>
            <details class="dropdown">
              <summary class="secondary">Project Agenda</summary>
              <ul class="agenda-list">
                <template v-for="(phase, index) in agendaMenu" :key="phase.phaseTitle">
                  <hr v-if="index > 0" />
                  <li class="menu-header">
                    <strong>{{ phase.phaseTitle }}</strong>
                  </li>
                  <li v-for="step in phase.steps" :key="step.path">
                    <NuxtLink :to="step.path" class="menu-item"> ▪️ {{ step.label }}</NuxtLink>
                  </li>
                </template>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.brand-link {
  color: var(--pico-color);
  text-decoration: none;

  &:hover {
    color: var(--pico-primary-hover);
  }
}

.agenda-list {
  position: absolute;
  right: 0;
  left: auto;
  max-height: 80vh;
  padding: 0.75rem;
  overflow-y: auto;

  hr {
    width: 100%;
    margin: 0.5rem 0;
  }

  .menu-header {
    font-size: 0.85rem;
    color: var(--pico-heading-color);
  }

  .menu-item {
    font-size: 0.8rem;
  }
}
</style>
