<script setup lang="ts">
import { useFetch, type Post } from '#imports'

// Allow cache to be shared by specifying a key
const {
  data: posts,
  pending: isLoading,
  error,
} = await useFetch<Post[]>('/api/phase2/posts', {
  key: 'posts-cache-key',
})
</script>

<template>
  <article>
    <header>
      <h2>Step 6: Post List (<code>useFetch</code>)</h2>
    </header>

    <section>
      <p>
        Data is fetched using <code>useFetch</code> with a specific key. Click a post to view details via
        <code>useNuxtData</code> without extra network requests.
      </p>

      <p v-if="isLoading">Loading posts...</p>
      <p v-if="error" class="notice">Failed to load posts.</p>

      <div v-if="posts" class="grid-posts">
        <div v-for="post in posts" :key="post.id" class="card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content.substring(0, 45) }}...</p>
          <NuxtLink :to="`/phase2/posts/${post.id}`" class="secondary outline role-button"> View Detail </NuxtLink>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.grid-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.card {
  padding: 1rem;
  background-color: var(--card-background-color);
  border: 1px solid var(--muted-border-color);
  border-radius: var(--border-radius);
}

.role-button {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  text-align: center;
  text-decoration: none;
}

.notice {
  color: var(--ins-color);
}
</style>
