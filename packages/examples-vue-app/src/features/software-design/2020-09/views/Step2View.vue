<script setup lang="ts"></script>

<template>
  <main class="article-page">
    <header>
      <h1>Step 2: Learn the basics of componentization and page navigation to build an SPA</h1>
      <p>[Step-by-Step] Vue.js Course Understand the Trends in JavaScript Frameworks</p>
    </header>

    <section class="article-section">
      <h2>The applications using Options API and componentization</h2>

      <ul>
        <li>
          <RouterLink to="/software-design/2020-09/step2/counter">Step 2-1: Example of the first component</RouterLink>
        </li>
        <li>
          <RouterLink to="/software-design/2020-09/step2/pages/1">Step 2-2: Pagination using RouterLink</RouterLink>
        </li>
      </ul>

      <RouterView />
    </section>
  </main>
</template>
