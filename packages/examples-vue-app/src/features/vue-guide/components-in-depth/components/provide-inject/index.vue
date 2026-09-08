<script setup lang="ts">
import DrillingTree from './drilling-tree/index.vue'
import GlobalComponent from './global-message/index.vue'
import InitialFactoryComponent from './initial-factory-component/index.vue'
import InitialValueComponent from './initial-value-component/index.vue'
import InjectionTree from './injection-tree/index.vue'
import ReactiveProvider from './reactive-provider/index.vue'
import SameKeyTree from './same-key-tree/index.vue'
import SymbolProviderComponent from './symbol-provider/index.vue'
</script>

<template>
  <section class="article-section">
    <h2>Prop Drilling</h2>
    <p>
      Prop drilling refers to the process of passing data from a parent component to a deeply nested child component
      through multiple layers of intermediate components.
    </p>

    <div class="article-example">
      <DrillingTree />
    </div>
  </section>

  <section class="article-section">
    <h2>Provide</h2>
    <p>To provide data to a component's descendants, use the <code>provide()</code> function</p>

    <div class="article-example">
      <InjectionTree />
    </div>
  </section>

  <section class="article-section">
    <h2>App-level Provide</h2>
    <p>App-level provides are available to all components rendered in the app.</p>

    <div class="article-example">
      <GlobalComponent />
    </div>
  </section>

  <section class="article-section">
    <h2>Inject</h2>
    <p>To inject data provided by an ancestor component, use the <code>inject()</code> function</p>

    <div class="article-example">
      <h3>Injected Data Example</h3>
      <p>
        If multiple parents provide data with the same key, inject will resolve to the value from the closest parent in
        component's parent chain.
      </p>
      <SameKeyTree />
    </div>

    <div class="article-example">
      <h3>Injection Default Values</h3>
      <p><code>const value = inject('message', 'default value')</code></p>
      <InitialValueComponent />
    </div>

    <div class="article-example">
      <h3>Use a factory function for creating the default value</h3>
      <p><code>const value = inject('key', () => new ExpensiveClass(), true)</code></p>
      <InitialFactoryComponent />
    </div>
  </section>

  <section class="article-section">
    <h2>Working with Reactivity</h2>
    <p>
      When using reactive provide / inject values, it is recommended to keep any mutations to reactive state inside of
      the provider whenever possible.
    </p>

    <div class="article-example">
      <ReactiveProvider />
    </div>
  </section>

  <section class="article-section">
    <h2>Working with Symbol Keys</h2>
    <p>
      When creating large-scale applications or components intended for use by other developers, it is best to use
      Symbols as injection keys to avoid unexpected collisions.
    </p>

    <div class="article-example">
      <p><code>export const myInjectionKey = Symbol('ISymbolInjector') as InjectionKey&lt;ISymbolInjector&gt;</code></p>
      <SymbolProviderComponent />
    </div>
  </section>
</template>
