<script setup lang="ts">
import { useNuxtData, useRoute } from 'nuxt/app'
import { computed } from 'vue'

import type { Post } from '#shared/types/posts'

const route = useRoute()
const postId = Number(route.params.id)

// Attempt to retrieve existing cache with useNuxtData
const { data: cachedPosts } = useNuxtData<Post[]>('posts-cache-key')

// Narrow down applicable data from cache or fetch results
const post = computed(() => cachedPosts.value?.find((p) => p.id === postId))
</script>

<template>
  <article>
    <header>
      <h2>Post Detail (`useNuxtData` Integration)</h2>
    </header>

    <section>
      <div v-if="post" class="card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <span class="badge-source">⚡ Loaded from useNuxtData cache (No extra API request)</span>
      </div>

      <p v-else class="notice">Post not found.</p>

      <div style="margin-top: 1.5rem">
        <NuxtLink to="/phase2/posts" class="secondary outline role-button"> ← Back to List </NuxtLink>
      </div>
    </section>
  </article>
</template>

<style scoped>
.card {
  padding: 1.5rem;
  background-color: var(--card-background-color);
  border: 1px solid var(--muted-border-color);
  border-radius: var(--border-radius);
}

.badge-source {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--pico-color-green-650);
  background-color: var(--pico-color-green-50);
  border-radius: 4px;
}

.role-button {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  text-decoration: none;
}

.notice {
  color: var(--ins-color);
}
</style>
