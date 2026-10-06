<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

type Token = {
  name: string
  label: string
}

type ColorToken = Token & {
  textColor?: string
}

const colorGroups: { title: string; tokens: ColorToken[] }[] = [
  {
    title: 'Actions',
    tokens: [
      { name: '--app-color-brand', label: 'Brand' },
      { name: '--app-color-primary', label: 'Primary', textColor: '--app-color-on-primary' },
      { name: '--app-color-secondary', label: 'Secondary', textColor: '--app-color-on-secondary' },
      { name: '--app-color-accent', label: 'Accent', textColor: '--app-color-on-accent' },
    ],
  },
  {
    title: 'System status',
    tokens: [
      { name: '--app-color-info', label: 'Info', textColor: '--app-color-on-info' },
      { name: '--app-color-success', label: 'Success', textColor: '--app-color-on-success' },
      { name: '--app-color-warning', label: 'Warning', textColor: '--app-color-on-warning' },
      { name: '--app-color-error', label: 'Error', textColor: '--app-color-on-error' },
    ],
  },
  {
    title: 'Surfaces',
    tokens: [
      { name: '--app-surface-ground', label: 'Ground' },
      { name: '--app-surface-section', label: 'Section' },
      { name: '--app-surface-card', label: 'Card' },
      { name: '--app-surface-overlay', label: 'Overlay' },
      { name: '--app-surface-border', label: 'Border' },
      { name: '--app-surface-hover', label: 'Hover' },
      { name: '--app-surface-disabled', label: 'Disabled' },
    ],
  },
  {
    title: 'Text & controls',
    tokens: [
      { name: '--app-color-text-emphasis', label: 'Emphasis' },
      { name: '--app-color-text', label: 'Text' },
      { name: '--app-color-text-muted', label: 'Muted' },
      { name: '--app-color-text-link', label: 'Link' },
      { name: '--app-control-background', label: 'Control background' },
      { name: '--app-control-background-hover', label: 'Control hover' },
      { name: '--app-control-border', label: 'Control border' },
      { name: '--app-control-text', label: 'Control text' },
    ],
  },
]

const layoutTokens: Token[] = [
  { name: '--app-spacing-xs', label: 'Extra small' },
  { name: '--app-spacing-sm', label: 'Small' },
  { name: '--app-spacing-md', label: 'Medium' },
  { name: '--app-spacing-lg', label: 'Large' },
  { name: '--app-spacing-xl', label: 'Extra large' },
  { name: '--app-spacing-xxl', label: '2X large' },
  { name: '--app-radius-sm', label: 'Small' },
  { name: '--app-radius-md', label: 'Medium' },
  { name: '--app-radius-lg', label: 'Large' },
  { name: '--app-radius-full', label: 'Full' },
]

const tokenValues = ref<Record<string, string>>({})
const allTokens = [
  ...colorGroups.flatMap((group) =>
    group.tokens.flatMap(({ name, textColor }) => (textColor ? [name, textColor] : [name])),
  ),
  ...layoutTokens.map(({ name }) => name),
]

let colorScheme: MediaQueryList | undefined

function updateTokenValues() {
  const styles = getComputedStyle(document.documentElement)
  tokenValues.value = Object.fromEntries(allTokens.map((name) => [name, styles.getPropertyValue(name).trim()]))
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateTokenValues()
  colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  colorScheme.addEventListener('change', updateTokenValues)
})

onUnmounted(() => {
  colorScheme?.removeEventListener('change', updateTokenValues)
})
</script>

<template>
  <DefaultLayout class="tokens-view">
    <main class="tokens-page">
      <header class="page-header">
        <div class="eyebrow"><span></span> UI FOUNDATION / CSS VARIABLES</div>
        <h1>Design &amp; Typography</h1>
        <p>
          A live reference for the colors, type, spacing, and controls defined in
          <code>variables.css</code>.
        </p>
        <div class="brand-banner">
          <div>
            <span class="banner-label">BRAND COLOR</span>
            <strong>One system, every surface.</strong>
          </div>
          <code>--app-color-brand</code>
        </div>
      </header>

      <section id="design" class="token-section" aria-labelledby="design-title">
        <div class="section-heading">
          <span class="section-number">01</span>
          <div>
            <h2 id="design-title">Design</h2>
            <p>A preview of the visual language, from page headings to supporting details.</p>
          </div>
        </div>

        <div class="showcase-card type-specimen">
          <div class="type-hierarchy">
            <span class="specimen-label">EDITORIAL / PAGE INTRODUCTION</span>
            <h3 class="type-display">Make room for<br />good ideas.</h3>
            <p class="type-lead">A considered interface gives content a clear voice and space to breathe.</p>
            <a class="design-link" href="#typography">Explore the type system <span>→</span></a>
          </div>

          <div class="type-details">
            <div class="type-detail">
              <span class="specimen-label">SURFACE / CARD</span>
              <strong>Thoughtful details</strong>
              <p>Quiet surfaces and subtle borders keep the focus on the content.</p>
            </div>
            <span class="design-mark" aria-hidden="true">Aa</span>
          </div>
        </div>

        <div class="list-preview">
          <div>
            <span class="specimen-label">LIST / HOVER</span>
            <p>Hover or focus a row to preview the interactive surface color.</p>
          </div>
          <nav class="preview-list" aria-label="List hover preview">
            <a class="preview-list__item" href="#typography">
              <span>
                <strong>Typography examples</strong>
                <small>Review the applied type styles</small>
              </span>
              <span class="preview-list__arrow" aria-hidden="true">↗</span>
            </a>
            <a class="preview-list__item" href="#colors">
              <span>
                <strong>Color system</strong>
                <small>Explore backgrounds and text colors</small>
              </span>
              <span class="preview-list__arrow" aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </section>

      <section id="typography" class="token-section" aria-labelledby="typography-title">
        <div class="section-heading">
          <span class="section-number">02</span>
          <div>
            <h2 id="typography-title">Typography</h2>
            <p>Compare the type scale, weight, line height, and letter spacing in context.</p>
          </div>
        </div>

        <div class="showcase-card typography-specimen">
          <div class="type-comparison">
            <span class="specimen-label">FONT SIZE / SAME SAMPLE</span>
            <div class="type-sample type-sample--sm">
              <code>--app-text-sm</code>
              <span>Design tokens shape every detail.</span>
            </div>
            <div class="type-sample type-sample--base">
              <code>--app-text-base</code>
              <span>Design tokens shape every detail.</span>
            </div>
            <div class="type-sample type-sample--lg">
              <code>--app-text-lg</code>
              <span>Design tokens shape every detail.</span>
            </div>
            <div class="type-sample type-sample--xl">
              <code>--app-text-xl</code>
              <span>Design tokens shape every detail.</span>
            </div>
            <div class="type-sample type-sample--2xl">
              <code>--app-text-2xl</code>
              <span>Design tokens shape every detail.</span>
            </div>
          </div>

          <div class="type-comparison">
            <span class="specimen-label">FONT WEIGHT / SAME SAMPLE</span>
            <div class="type-sample">
              <code>--app-weight-normal / 400</code>
              <span class="weight-normal">Readable by design.</span>
            </div>
            <div class="type-sample">
              <code>--app-weight-bold / 700</code>
              <span class="weight-bold">Readable by design.</span>
            </div>
          </div>

          <div class="type-variation-grid">
            <div class="type-comparison">
              <span class="specimen-label">LINE HEIGHT / SAME PARAGRAPH</span>
              <div class="type-sample line-sample line-sample--tight">
                <code>--app-leading-tight / 1.2</code>
                <p>Clear rhythm helps readers follow a thought<br />from one line to the next.</p>
              </div>
              <div class="type-sample line-sample line-sample--normal">
                <code>--app-leading-normal / 1.7</code>
                <p>Clear rhythm helps readers follow a thought<br />from one line to the next.</p>
              </div>
              <div class="type-sample line-sample line-sample--loose">
                <code>--app-leading-loose / 1.85</code>
                <p>Clear rhythm helps readers follow a thought<br />from one line to the next.</p>
              </div>
            </div>

            <div class="type-comparison">
              <span class="specimen-label">LETTER SPACING / SAME SAMPLE</span>
              <div class="type-sample tracking-sample tracking-sample--tight">
                <code>--app-tracking-tight / 0.02em</code>
                <span>Thoughtful spacing</span>
              </div>
              <div class="type-sample tracking-sample tracking-sample--normal">
                <code>--app-tracking-normal / 0.05em</code>
                <span>Thoughtful spacing</span>
              </div>
              <div class="type-sample tracking-sample tracking-sample--wide">
                <code>--app-tracking-wide / 0.1em</code>
                <span>Thoughtful spacing</span>
              </div>
            </div>
          </div>

          <div class="type-comparison">
            <span class="specimen-label">FONT FAMILY</span>
            <div class="font-family-sample">
              <span><code>--app-font-sans</code> The quick brown fox jumps over the lazy dog.</span>
              <span><code>--app-font-mono</code> const spacing = 'intentional'</span>
            </div>
          </div>
        </div>
      </section>

      <section id="colors" class="token-section" aria-labelledby="colors-title">
        <div class="section-heading">
          <span class="section-number">03</span>
          <div>
            <h2 id="colors-title">Color system</h2>
            <p>Color swatches use the same variables as the application UI, including their text colors.</p>
          </div>
        </div>

        <div v-for="group in colorGroups" :key="group.title" class="color-group">
          <h3>{{ group.title }}</h3>
          <div class="swatch-grid">
            <article v-for="token in group.tokens" :key="token.name" class="swatch-card">
              <div
                class="swatch-color"
                :style="{
                  backgroundColor: `var(${token.name})`,
                  color: token.textColor ? `var(${token.textColor})` : 'var(--app-color-text-emphasis)',
                }"
              >
                <span>{{ token.label }} text</span>
              </div>
              <div class="swatch-meta">
                <strong>{{ token.label }}</strong>
                <code>{{ token.name }}</code>
                <span>{{ tokenValues[token.name] || '—' }}</span>
                <small v-if="token.textColor"> Text: {{ tokenValues[token.textColor] || token.textColor }} </small>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="layout" class="token-section" aria-labelledby="layout-title">
        <div class="section-heading">
          <span class="section-number">04</span>
          <div>
            <h2 id="layout-title">Spacing &amp; shape</h2>
            <p>Consistent proportions for comfortable, clear interfaces.</p>
          </div>
        </div>

        <div class="showcase-card layout-specimen">
          <div class="spacing-scale">
            <div v-for="token in layoutTokens.slice(0, 6)" :key="token.name" class="scale-row">
              <code>{{ token.name }}</code>
              <span class="space-bar" :style="{ width: tokenValues[token.name] || '0' }"></span>
              <span>{{ tokenValues[token.name] || '—' }}</span>
            </div>
          </div>
          <div class="radius-scale">
            <div v-for="token in layoutTokens.slice(6)" :key="token.name" class="radius-item">
              <span class="radius-shape" :style="{ borderRadius: `var(${token.name})` }"></span>
              <code>{{ token.name }}</code>
              <span>{{ tokenValues[token.name] || '—' }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="controls" class="token-section" aria-labelledby="controls-title">
        <div class="section-heading">
          <span class="section-number">05</span>
          <div>
            <h2 id="controls-title">Controls</h2>
            <p>Actions, feedback states, and form elements using the token palette.</p>
          </div>
        </div>

        <div class="showcase-card controls-card">
          <div class="control-block">
            <span class="specimen-label">ACTIONS</span>
            <div class="button-row">
              <button class="demo-button demo-button--primary" type="button">Primary</button>
              <button class="demo-button demo-button--secondary" type="button">Secondary</button>
              <button class="demo-button demo-button--accent" type="button">Accent</button>
              <button class="demo-button" type="button" disabled>Disabled</button>
            </div>
          </div>

          <div class="control-block">
            <span class="specimen-label">SYSTEM STATUS</span>
            <div class="button-row">
              <button class="demo-button demo-button--info" type="button">Info</button>
              <button class="demo-button demo-button--success" type="button">Success</button>
              <button class="demo-button demo-button--warning" type="button">Warning</button>
              <button class="demo-button demo-button--error" type="button">Error</button>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-field">
              <label for="normal-input">Text input</label>
              <input id="normal-input" type="text" placeholder="Type something..." />
              <small>Focus to see the primary color.</small>
            </div>
            <div class="form-field">
              <label for="select-input">Select menu</label>
              <select id="select-input">
                <option>Choose an option</option>
                <option>Option two</option>
                <option>Option three</option>
              </select>
              <small>Native controls inherit the app typography.</small>
            </div>
            <div class="form-field">
              <label for="error-input">Error state</label>
              <input id="error-input" class="input-error" type="text" value="Invalid value" />
              <small class="error-copy">Please check this value.</small>
            </div>
            <div class="form-field">
              <label for="disabled-input">Disabled state</label>
              <input id="disabled-input" type="text" value="Not editable" disabled />
              <small>Unavailable controls remain readable.</small>
            </div>
          </div>

          <fieldset class="choice-field">
            <legend>Choices</legend>
            <label><input type="checkbox" checked /> Selected</label>
            <label><input type="checkbox" /> Unselected</label>
            <label><input type="checkbox" disabled /> Disabled</label>
            <span class="choice-divider"></span>
            <label><input type="radio" name="demo-choice" checked /> Option one</label>
            <label><input type="radio" name="demo-choice" /> Option two</label>
          </fieldset>
        </div>
      </section>

      <footer class="page-footer">
        <span>VARIABLES.CSS / LIVE PREVIEW</span>
        <a href="#top" @click.prevent="scrollToTop">Back to top ↑</a>
      </footer>
    </main>
  </DefaultLayout>
</template>

<style lang="css" scoped>
.tokens-page {
  --page-width: 860px;
  --section-gap: var(--app-spacing-xxl);

  width: min(100%, var(--page-width));
  padding: var(--app-spacing-xl) var(--app-spacing-md) var(--app-spacing-xxl);
  margin: 0 auto;
  color: var(--app-color-text);
}

.page-header {
  padding: var(--app-spacing-lg) 0 var(--app-spacing-xl);
  border-bottom: 1px solid var(--app-surface-border);
}

.eyebrow,
.specimen-label,
.banner-label,
.page-footer {
  font-family: var(--app-font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
}

.eyebrow {
  display: flex;
  gap: var(--app-spacing-sm);
  align-items: center;
  margin-bottom: var(--app-spacing-md);
  color: var(--app-color-text-muted);
}

.eyebrow span {
  width: 8px;
  height: 8px;
  background: var(--app-color-brand);
  border-radius: var(--app-radius-full);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--app-color-brand) 16%, transparent);
}

.page-header h1 {
  margin-bottom: var(--app-spacing-sm);
}

.page-header > p,
.section-heading p {
  color: var(--app-color-text-muted);
}

.page-header > p code {
  padding: 0.1em 0.4em;
  color: var(--app-color-text-emphasis);
  background: var(--app-surface-section);
  border-radius: var(--app-radius-sm);
}

.brand-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--app-spacing-md) var(--app-spacing-lg);
  margin-top: var(--app-spacing-xl);
  color: #fff;
  background: var(--app-color-brand);
  border-radius: var(--app-radius-md);
}

.brand-banner > div {
  display: grid;
  gap: var(--app-spacing-xs);
}

.banner-label {
  opacity: 0.78;
}

.brand-banner code {
  padding: var(--app-spacing-xs) var(--app-spacing-sm);
  font-size: var(--app-text-sm);
  background: rgb(0 0 0 / 0.12);
  border-radius: var(--app-radius-sm);
}

.token-section {
  padding-top: var(--section-gap);
  scroll-margin-top: var(--app-spacing-xl);
}

.section-heading {
  display: flex;
  gap: var(--app-spacing-md);
  align-items: flex-start;
  padding-bottom: var(--app-spacing-lg);
}

.section-number {
  padding-top: 0.25rem;
  font-family: var(--app-font-mono);
  font-size: var(--app-text-sm);
  color: var(--app-color-brand);
}

.section-heading h2 {
  margin-bottom: var(--app-spacing-xs);
}

.showcase-card {
  padding: var(--app-spacing-lg);
  background: var(--app-surface-card);
  border: 1px solid var(--app-surface-border);
  border-radius: var(--app-radius-lg);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--app-color-text-emphasis) 4%, transparent);
}

.type-specimen {
  display: grid;
  gap: var(--app-spacing-lg);
}

.specimen-label {
  display: block;
  margin-bottom: var(--app-spacing-md);
  color: var(--app-color-text-muted);
}

.type-hierarchy {
  display: grid;
  gap: var(--app-spacing-sm);
}

.type-display {
  margin-bottom: var(--app-spacing-md);
  font-size: var(--app-text-2xl);
  font-weight: var(--app-weight-bold);
  line-height: var(--app-leading-tight);
  color: var(--app-color-text-emphasis);
  letter-spacing: var(--app-tracking-tight);
}

.design-link {
  display: inline-flex;
  gap: var(--app-spacing-xs);
  align-items: center;
  width: fit-content;
  padding: 0;
  font-size: var(--app-text-sm);
  font-weight: var(--app-weight-bold);
  color: var(--app-color-text-link);
  text-decoration: none;
}

.design-link span {
  transition: transform 150ms ease;
}

.design-link:hover span {
  transform: translateX(3px);
}

.type-details {
  position: relative;
  display: grid;
  gap: var(--app-spacing-md);
  align-content: center;
  min-height: 12rem;
  padding-top: var(--app-spacing-lg);
  overflow: hidden;
  background: var(--app-surface-section);
  border-radius: var(--app-radius-md);
}

.type-details > .type-detail {
  padding: var(--app-spacing-md);
}

.type-detail strong {
  font-size: var(--app-text-lg);
  color: var(--app-color-text-emphasis);
}

.type-detail p {
  font-size: var(--app-text-sm);
  color: var(--app-color-text-muted);
}

.design-mark {
  position: absolute;
  right: var(--app-spacing-md);
  bottom: -2.5rem;
  font-size: 10rem;
  font-weight: var(--app-weight-bold);
  line-height: var(--app-leading-none);
  color: color-mix(in srgb, var(--app-color-primary) 12%, transparent);
  pointer-events: none;
}

.typography-specimen {
  display: grid;
  gap: var(--app-spacing-xl);
}

.type-comparison {
  display: grid;
  gap: var(--app-spacing-sm);
}

.type-comparison + .type-comparison,
.type-variation-grid {
  padding-top: var(--app-spacing-lg);
  border-top: 1px solid var(--app-surface-border);
}

.type-sample {
  display: grid;
  grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.5fr);
  gap: var(--app-spacing-md);
  align-items: baseline;
  padding: var(--app-spacing-xs) 0;
}

.type-sample > code,
.font-family-sample code {
  font-size: 0.6875rem;
  color: var(--app-color-text-muted);
}

.type-sample > span,
.type-sample p {
  color: var(--app-color-text-emphasis);
}

.type-sample--sm > span {
  font-size: var(--app-text-sm);
}

.type-sample--base > span {
  font-size: var(--app-text-base);
}

.type-sample--lg > span {
  font-size: var(--app-text-lg);
}

.type-sample--xl > span {
  font-size: var(--app-text-xl);
}

.type-sample--2xl > span {
  font-size: var(--app-text-2xl);
}

.weight-normal {
  font-weight: var(--app-weight-normal);
}

.weight-bold {
  font-weight: var(--app-weight-bold);
}

.type-variation-grid {
  display: grid;
  gap: var(--app-spacing-lg);
}

.line-sample {
  grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1fr);
  align-items: start;
}

.line-sample p {
  max-width: 25rem;
}

.line-sample--tight p {
  line-height: var(--app-leading-tight);
}

.line-sample--normal p {
  line-height: var(--app-leading-normal);
}

.line-sample--loose p {
  line-height: var(--app-leading-loose);
}

.tracking-sample--tight span {
  letter-spacing: var(--app-tracking-tight);
}

.tracking-sample--normal span {
  letter-spacing: var(--app-tracking-normal);
}

.tracking-sample--wide span {
  letter-spacing: var(--app-tracking-wide);
}

.font-family-sample {
  display: grid;
  gap: var(--app-spacing-sm);
}

.font-family-sample > span {
  display: grid;
  grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.5fr);
  gap: var(--app-spacing-md);
}

.font-family-sample > span:first-child {
  font-family: var(--app-font-sans);
}

.font-family-sample > span:last-child {
  font-family: var(--app-font-mono);
}

.swatch-meta code,
.scale-row code,
.radius-item code {
  min-width: 0;
  font-size: 0.75rem;
  overflow-wrap: anywhere;
}

.color-group + .color-group {
  margin-top: var(--app-spacing-xl);
}

.color-group h3 {
  margin-bottom: var(--app-spacing-sm);
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 132px), 1fr));
  gap: var(--app-spacing-sm);
}

.swatch-card {
  min-width: 0;
  overflow: hidden;
  background: var(--app-surface-card);
  border: 1px solid var(--app-surface-border);
  border-radius: var(--app-radius-md);
}

.swatch-color {
  display: flex;
  align-items: flex-end;
  min-height: 48px;
  padding: var(--app-spacing-xs);
  color: var(--app-color-text-emphasis);
  background-image: linear-gradient(135deg, transparent 50%, rgb(0 0 0 / 0.04) 50%);
}

.swatch-color span {
  font-size: 0.6875rem;
  text-shadow: 0 1px 2px color-mix(in srgb, var(--app-surface-card) 40%, transparent);
}

.swatch-meta {
  display: grid;
  gap: 2px;
  padding: var(--app-spacing-xs);
}

.swatch-meta strong {
  font-size: 0.75rem;
  color: var(--app-color-text-emphasis);
}

.swatch-meta code,
.swatch-meta > span {
  color: var(--app-color-text-muted);
}

.swatch-meta > span {
  font-size: 0.6875rem;
}

.swatch-meta small {
  font-size: 0.625rem;
  color: var(--app-color-text-muted);
}

.layout-specimen {
  display: grid;
  gap: var(--app-spacing-xl);
}

.spacing-scale,
.radius-scale {
  display: grid;
  gap: var(--app-spacing-md);
}

.scale-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) 3rem;
  gap: var(--app-spacing-md);
  align-items: center;
}

.space-bar {
  display: block;
  max-width: 100%;
  height: 8px;
  background: var(--app-color-brand);
  border-radius: var(--app-radius-full);
}

.scale-row > span:last-child,
.radius-item > span:last-child {
  font-size: var(--app-text-sm);
  color: var(--app-color-text-muted);
  text-align: right;
}

.radius-scale {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-top: var(--app-spacing-lg);
  border-top: 1px solid var(--app-surface-border);
}

.radius-item {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  gap: var(--app-spacing-sm);
  align-items: center;
  min-width: 0;
}

.radius-shape {
  width: 2rem;
  height: 2rem;
  background: var(--app-surface-section);
  border: 2px solid var(--app-color-primary);
}

.controls-card,
.control-block {
  display: grid;
  gap: var(--app-spacing-lg);
}

.control-block + .control-block {
  padding-top: var(--app-spacing-lg);
  border-top: 1px solid var(--app-surface-border);
}

.control-block .specimen-label {
  margin-bottom: calc(-1 * var(--app-spacing-md));
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-spacing-sm);
}

.demo-button {
  min-height: 2.5rem;
  padding: var(--app-spacing-xs) var(--app-spacing-md);
  font-size: var(--app-text-sm);
  font-weight: var(--app-weight-bold);
  border: 1px solid transparent;
  border-radius: var(--app-radius-md);
}

.demo-button--primary {
  color: var(--app-color-on-primary);
  background: var(--app-color-primary);
}

.demo-button--secondary {
  color: var(--app-color-on-secondary);
  background: var(--app-color-secondary);
}

.demo-button--accent {
  color: var(--app-color-on-accent);
  background: var(--app-color-accent);
}

.demo-button--info {
  color: var(--app-color-on-info);
  background: var(--app-color-info);
}

.demo-button--success {
  color: var(--app-color-on-success);
  background: var(--app-color-success);
}

.demo-button--warning {
  color: var(--app-color-on-warning);
  background: var(--app-color-warning);
}

.demo-button--error {
  color: var(--app-color-on-error);
  background: var(--app-color-error);
}

.demo-button:disabled {
  color: var(--app-color-text-muted);
  cursor: not-allowed;
  background: var(--app-surface-disabled);
  border-color: var(--app-surface-border);
}

.form-grid {
  display: grid;
  gap: var(--app-spacing-lg);
  padding-top: var(--app-spacing-lg);
  border-top: 1px solid var(--app-surface-border);
}

.form-field {
  display: grid;
  gap: var(--app-spacing-xs);
}

.form-field label,
.choice-field legend {
  font-size: var(--app-text-sm);
  font-weight: var(--app-weight-bold);
  color: var(--app-color-text-emphasis);
}

.form-field input,
.form-field select {
  width: 100%;
  min-height: 2.75rem;
  padding: var(--app-spacing-sm) var(--app-spacing-md);
  color: var(--app-control-text);
  background: var(--app-control-background);
  border: 1px solid var(--app-control-border);
  border-radius: var(--app-radius-md);
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.form-field input:focus,
.form-field select:focus {
  outline: 0;
  border-color: var(--app-color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--app-color-primary) 18%, transparent);
}

.form-field input:disabled {
  color: var(--app-color-text-muted);
  cursor: not-allowed;
  background: var(--app-surface-disabled);
}

.form-field .input-error,
.form-field .input-error:focus {
  border-color: var(--app-color-error);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--app-color-error) 18%, transparent);
}

.form-field small {
  font-size: var(--app-text-sm);
  color: var(--app-color-text-muted);
}

.form-field .error-copy {
  color: var(--app-color-error);
}

.choice-field {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-spacing-md);
  align-items: center;
  padding: var(--app-spacing-lg) 0 0;
  border: 0;
  border-top: 1px solid var(--app-surface-border);
}

.choice-field legend {
  padding: 0;
  margin-bottom: var(--app-spacing-sm);
}

.choice-field label {
  display: inline-flex;
  gap: var(--app-spacing-xs);
  align-items: center;
  font-size: var(--app-text-sm);
  cursor: pointer;
}

.choice-field input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--app-color-primary);
}

.choice-field input:disabled {
  cursor: not-allowed;
}

.choice-divider {
  width: 1px;
  height: 1.5rem;
  background: var(--app-surface-border);
}

.list-preview {
  display: grid;
  gap: var(--app-spacing-md);
  padding: var(--app-spacing-lg);
  margin-top: var(--app-spacing-lg);
  background: var(--app-surface-section);
  border: 1px solid var(--app-surface-border);
  border-radius: var(--app-radius-lg);
}

.list-preview > div > p {
  font-size: var(--app-text-sm);
  color: var(--app-color-text-muted);
}

.list-preview .specimen-label {
  margin-bottom: var(--app-spacing-xs);
}

.preview-list {
  overflow: hidden;
  background: var(--app-surface-card);
  border: 1px solid var(--app-surface-border);
  border-radius: var(--app-radius-md);
}

.preview-list__item {
  display: flex;
  gap: var(--app-spacing-md);
  align-items: center;
  justify-content: space-between;
  padding: var(--app-spacing-md);
  color: var(--app-color-text);
  text-decoration: none;
  transition: background-color 150ms ease;
}

.preview-list__item + .preview-list__item {
  border-top: 1px solid var(--app-surface-border);
}

.preview-list__item:hover,
.preview-list__item:focus-visible {
  background: var(--app-surface-hover);
}

.preview-list__item:focus-visible {
  outline: 2px solid var(--app-color-text-link);
  outline-offset: -2px;
}

.preview-list__item > span:first-child {
  display: grid;
  gap: var(--app-spacing-xs);
}

.preview-list__item strong {
  font-size: var(--app-text-sm);
  color: var(--app-color-text-emphasis);
}

.preview-list__item small,
.preview-list__arrow {
  color: var(--app-color-text-muted);
}

.preview-list__item small {
  font-size: var(--app-text-sm);
}

.preview-list__arrow {
  font-size: var(--app-text-lg);
  transition:
    color 150ms ease,
    transform 150ms ease;
}

.preview-list__item:hover .preview-list__arrow,
.preview-list__item:focus-visible .preview-list__arrow {
  color: var(--app-color-text-link);
  transform: translate(2px, -2px);
}

.page-footer {
  display: flex;
  justify-content: space-between;
  padding-top: var(--app-spacing-lg);
  margin-top: var(--section-gap);
  color: var(--app-color-text-muted);
  border-top: 1px solid var(--app-surface-border);
}

.page-footer a {
  padding: 0;
  color: var(--app-color-text-link);
}

@media (width >= 640px) {
  .tokens-page {
    padding-right: var(--app-spacing-xl);
    padding-left: var(--app-spacing-xl);
  }

  .type-specimen {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    align-items: center;
  }

  .type-details {
    padding-top: 0;
  }

  .type-variation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .font-family-sample > span {
    grid-template-columns: minmax(10rem, 0.8fr) minmax(0, 1.5fr);
  }

  .list-preview {
    grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 1.5fr);
    align-items: center;
  }

  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width < 480px) {
  .brand-banner {
    flex-direction: column;
    gap: var(--app-spacing-sm);
    align-items: flex-start;
  }

  .radius-scale {
    grid-template-columns: minmax(0, 1fr);
  }

  .choice-divider {
    display: none;
  }

  .type-sample,
  .line-sample,
  .font-family-sample > span {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--app-spacing-xs);
  }

  .type-sample--2xl > span {
    overflow-wrap: anywhere;
  }
}
</style>
