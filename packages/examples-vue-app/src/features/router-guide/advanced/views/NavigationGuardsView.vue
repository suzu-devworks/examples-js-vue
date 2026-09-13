<script setup lang="ts"></script>

<template>
  <main class="env-and-mode-view article-page">
    <header>
      <h1>Navigation Guards</h1>
      <p>Advanced</p>
    </header>

    <section class="article-section">
      <h2>Per-Route Guard</h2>
      <p>
        The <code>beforeEnter</code> guard is executed only when navigating to the route; it does not run when
        <code>params</code>, <code>query</code>, or <code>hash</code> change. It is triggered only when navigating from
        a different route.
      </p>

      <div class="article-example">
        <pre><code>const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]</code></pre>

        <RouterLink to="/router/guide/advanced/navigation-guards/users/1"
          >You can check this on a separate page.</RouterLink
        >
      </div>
    </section>

    <section class="article-section">
      <h2>In-Component Guards</h2>
      <p>Vue Router exposes update and leave guards as Composition API functions.</p>

      <p class="box warning">
        <code>onBeforeRouteLeave</code> executes only during transitions within an SPA managed by Vue Router. The
        navigation guard does not trigger when using a standard anchor tag instead of Vue Router's
        <code>RouterLink</code>.
      </p>

      <div class="article-example">
        <h3>Using the Composition API</h3>
        <p>You can add the following guards.</p>
        <pre><code>onBeforeRouteUpdate((to, from) => { /* ... */ })</code></pre>
        <pre><code>onBeforeRouteLeave((to, from) => { /* ... */ })</code></pre>

        <RouterLink to="/router/guide/advanced/navigation-guards/spots/1"
          >You can check this on a separate page.</RouterLink
        >
      </div>
    </section>
  </main>
</template>
