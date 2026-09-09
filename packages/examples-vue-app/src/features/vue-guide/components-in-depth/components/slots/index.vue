<script setup lang="ts">
import { ref } from 'vue'

import AwesomeIcon from './AwesomeIcon.vue'
import BaseLayout from './BaseLayout.vue'
import ChildComponent from './ChildComponent.vue'
import DynamicTabLayout from './DynamicTabLayout.vue'
import FancyButton from './FancyButton.vue'
import FancyCard from './FancyCard.vue'
import FancyList from './FancyList.vue'
import MouseTracker from './MouseTracker.vue'
import MyComponent from './MyComponent.vue'
import SubmitButton from './SubmitButton.vue'

const message = 'Hello from parent scope!'
const currentTab = ref('overview')
</script>

<template>
  <section class="article-section">
    <h2>Slot Content and Outlet</h2>
    <p>
      The <code>&lt;slot&gt;</code> element is a slot outlet that indicates where the parent-provided slot content
      should be rendered.
    </p>

    <div class="article-example">
      <div class="registered-component">
        <FancyButton>
          Click me
          <!-- slot content -->
        </FancyButton>

        <FancyButton>
          <span style="color: cyan">Click me! </span>
          <AwesomeIcon name="plus" />
        </FancyButton>
      </div>
    </div>
  </section>

  <section class="article-section">
    <h2>Render Scope</h2>
    <p>
      Since slot content is defined in the parent, it has access to the parent component's data scope but cannot access
      the child component's data.
    </p>

    <div class="article-example">
      <p class="parent-message">
        <span>{{ message }}</span>
      </p>
      <div class="registered-component">
        <FancyButton>{{ message }}</FancyButton>
      </div>
    </div>
  </section>

  <section class="article-section">
    <h2>Fallback Content</h2>
    <p>This is a fallback that renders only when no content is provided.</p>

    <div class="article-example">
      <h3>Provide no content for the slot.</h3>
      <p><code>&lt;SubmitButton /&gt;</code></p>
      <div class="registered-component">
        <SubmitButton />
      </div>
    </div>

    <div class="article-example">
      <h3>If content is provided.</h3>
      <p><code>&lt;SubmitButton&gt;Save&lt;/SubmitButton&gt;</code></p>
      <div class="registered-component">
        <SubmitButton>Save</SubmitButton>
      </div>
    </div>
  </section>

  <section class="article-section">
    <h2>Named Slots</h2>
    <p>
      To pass a named slot, we need to use a <code>&lt;template&gt;</code> element with the
      <code>v-slot</code> directive, and then pass the name of the slot as an argument to <code>v-slot:{name}</code>.
    </p>

    <div class="article-example">
      <BaseLayout>
        <template #header>
          <p class="layout-title">Here might be a page title</p>
        </template>

        <template #default>
          <p>A paragraph for the main content.</p>
          <p>And another one.</p>
        </template>

        <template #footer>
          <p>Here's some contact info</p>
        </template>
      </BaseLayout>
    </div>
  </section>

  <section class="article-section">
    <h2>Conditional Slots</h2>
    <p>
      Use the <code>$slots</code> property in combination with <code>v-if</code> to render only the slots to which
      content has been passed.
    </p>

    <div class="article-example">
      <FancyCard>
        <template #header>
          <p>This is the header</p>
        </template>

        <template #default>
          <p>This is the content</p>
          <p>We have decided not to specify a footer.</p>
        </template>

        <!-- <template #footer>
          <em>This is the footer</em>
        </template> -->
      </FancyCard>
    </div>
  </section>

  <section class="article-section">
    <h2>Dynamic Slot Names</h2>
    <p>
      Dynamic slot names are a feature that allows you to dynamically switch the slot name bound at runtime, such as in
      <code>v-slot:[slotName]</code>.
    </p>

    <div class="article-example">
      <DynamicTabLayout :active-tab-name="currentTab">
        <template #selector>
          <button @click="currentTab = 'overview'">overview</button>
          <button @click="currentTab = 'comments'">comments</button>
        </template>

        <!--
          dynamic slot name
          v-slot:[currentTab] can also be abbreviated as #[currentTab]
        -->
        <template #[currentTab]>
          <div v-if="currentTab === 'overview'">
            <h3>Summary content</h3>
            <p>A summary of the product is displayed here.</p>
          </div>

          <div v-if="currentTab === 'comments'">
            <h3>Comment list</h3>
            <p>Feedbacks from users are listed.</p>
          </div>
        </template>
      </DynamicTabLayout>
    </div>
  </section>

  <section class="article-section">
    <h2>Scoped Slots</h2>
    <p>
      Within the slot content, you can receive values ​​by specifying <code>props</code> on the
      <code>&lt;slot&gt;</code> element.
    </p>

    <div class="article-example">
      <h3>Use <code>v-slot="receivedProps"</code></h3>
      <ChildComponent v-slot="receivedProps"> {{ receivedProps.count }} {{ receivedProps.text }} </ChildComponent>
    </div>

    <div class="article-example">
      <h3>Named Scoped Slots</h3>
      <MyComponent>
        <template #header="headerProps">
          <code>{{ headerProps }}</code>
        </template>

        <template #default="defaultProps">
          <code>{{ defaultProps }}</code>
        </template>

        <template #footer="footerProps">
          <code>{{ footerProps }}</code>
        </template>
      </MyComponent>
    </div>

    <div class="article-example">
      <h3>Fancy List Example</h3>
      <FancyList api-url="url" :per-page="10">
        <template #item="{ body, username, likes }">
          <div class="item">
            <p>{{ body }}</p>
            <p class="meta">by {{ username }} | {{ likes }} likes</p>
          </div>
        </template>
      </FancyList>
    </div>

    <div class="article-example">
      <h3>Renderless Components</h3>
      <MouseTracker v-slot="{ x, y }"> Mouse is at: {{ x }}, {{ y }} </MouseTracker>
    </div>
  </section>
</template>

<style lang="css" scoped>
.article-section {
  .parent-message {
    width: 100%;
    padding: var(--app-spacing-sm);
    font-weight: var(--app-weight-bold);
    border: 1px solid var(--app-surface-border);
    border-radius: var(--app-radius-sm);
  }

  .layout-title {
    margin-bottom: var(--app-spacing-sm);
    font-size: var(--app-text-2xl);
    font-weight: var(--app-weight-bold);
  }

  .meta {
    font-size: var(--app-text-sm);
    color: var(--app-color-accent);
  }
}
</style>
