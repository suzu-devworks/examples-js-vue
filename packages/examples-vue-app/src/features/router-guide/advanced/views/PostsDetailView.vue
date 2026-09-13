<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { usePostsStore } from '../stores/usePostsStore'

const route = useRoute()
const postId = Number(route.params.id)

const { posts } = usePostsStore()
const post = computed(() => posts.find((p) => p.id === postId))

function normalizeDate(date: string | Date) {
  var dateValue = typeof date === 'string' ? new Date(date) : date
  return `${dateValue.toLocaleDateString()} ${dateValue.toLocaleTimeString()}`
}
</script>

<template>
  <section class="article-section">
    <a @click="$router.back()">← Back to Posts List</a>
    <template v-if="post">
      <h2>{{ post.title }}</h2>
      <ul>
        <li>Author: {{ post.author }}</li>
        <li>Created At: {{ normalizeDate(post.createdAt) }}</li>
      </ul>
      <p>{{ post.content }}</p>
    </template>

    <template v-else>
      <h2>Post not found.</h2>
    </template>
  </section>
</template>
