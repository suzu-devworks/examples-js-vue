<script setup lang="ts"></script>

<template>
  <main class="route-meta-fields-view article-page">
    <header>
      <h1>Route Meta Fields</h1>
      <p>Advanced</p>
    </header>

    <section class="article-section">
      <p>
        You can attach arbitrary information to a route and access it via properties available in route locations or
        navigation guards.
      </p>

      <div class="article-example">
        <p>When specifying an authentication request as meta-information within a route, as shown below:</p>
        <pre><code>{
  path: 'new',
  component: PostsNew,
  // only authenticated users can create posts
  meta: { requiresAuth: true },
},
</code></pre>

        <p>You can access meta information in route guards (Global Before Guards).</p>
        <pre><code>router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'auth.login', query: { redirect: to.fullPath } }
  }
})
</code></pre>

        <RouterLink to="/router/guide/advanced/route-meta-fields/posts/list"
          >You can check this on a separate page.</RouterLink
        >
      </div>
    </section>
  </main>
</template>
