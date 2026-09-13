<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePostsStore, type Post } from '../stores/usePostsStore'

const data = ref<Post>({
  id: 0,
  title: '',
  author: '',
  content: '',
  createdAt: '',
})

const errorMessage = ref('')
const { posts, addPosts } = usePostsStore()
const router = useRouter()

function createPost() {
  if (!data.value.title || !data.value.author || !data.value.content) {
    errorMessage.value = 'All fields are required.'
    return
  }

  data.value.id = posts.length + 1
  data.value.createdAt = new Date()
  addPosts(data.value)
  router.push({ name: 'router.route-meta-fields.posts-list' })
}
</script>

<template>
  <section class="post-new-view article-section">
    <h2>New Post</h2>

    <form>
      <label for="title">Title:</label>
      <input v-model="data.title" name="title" type="text" />
      <label for="author">Author:</label>
      <input v-model="data.author" name="author" type="text" />
      <label for="content">Content:</label>
      <textarea v-model="data.content" name="content"></textarea>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <button type="submit" @click.prevent="createPost">Create Post</button>
    </form>
  </section>
</template>

<style lang="css" scoped>
.post-new-view {
  form {
    display: grid;
    grid-template-columns: 6rem 1fr;
    gap: var(--app-spacing-sm);
    width: 100%;

    > input,
    textarea {
      grid-column: 2;
      width: 20em;
    }

    > p {
      grid-column: 1 / span 2;
    }

    > button {
      grid-column: 1 / span 2;
      justify-self: start;
      width: 10em;
    }
  }

  .error {
    padding: var(--app-spacing-sm);
    font-size: var(--app-text-sm);
    font-weight: var(--app-weight-bold);
    color: var(--app-color-on-error);
    background-color: var(--app-color-error);
    border-radius: var(--app-radius-md);
  }
}
</style>
