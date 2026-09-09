<script setup lang="ts">
import DedicatedWorkerComponent from '../components/DedicatedWorkerComponent.vue'
import SharedWorkerComponent from '../components/SharedWorkerComponent.vue'
</script>

<template>
  <main class="feature-view article-page">
    <header>
      <h1>Features</h1>
      <p>Guide</p>
    </header>

    <section class="article-section">
      <h2>Web Workers</h2>

      <div class="article-example">
        <h3>Import with Constructors</h3>
        <p>A web worker script can be imported using new Worker() and new SharedWorker().</p>
        <pre><code>const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
})</code></pre>
        <div>
          <DedicatedWorkerComponent />
        </div>
      </div>

      <div class="article-example">
        <h3>Import with Query Suffixes</h3>
        <p>A web worker script can be directly imported by appending ?worker or ?sharedworker to the import request.</p>
        <pre><code>import MyWorker from '../worker?worker'<br>const worker = new MyWorker()</code></pre>
        <div class="grid-box">
          <SharedWorkerComponent initial="Hello left side" />
          <SharedWorkerComponent initial="Hello right side" />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="css" scoped>
.feature-view {
  .grid-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--app-spacing-sm);
    width: 100%;
  }
}
</style>
