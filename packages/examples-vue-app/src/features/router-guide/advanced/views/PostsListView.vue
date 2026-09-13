<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth/stores/useAuthStore'

import { usePostsStore } from '../stores/usePostsStore'

const router = useRouter()

function goToNewPost() {
  router.push({ name: 'router.route-meta-fields.post-new' })
}

const postsStore = usePostsStore()
// Destructuring store state breaks reactivity, so use storeToRefs for state only.
const { posts } = storeToRefs(postsStore)
const { removePost: removePostFromStore } = postsStore

const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isAuthenticated())

function removePost(postId: number) {
  if (!auth.isAuthenticated()) {
    return
  }
  console.log(`Removing post with ID: ${postId}`)
  removePostFromStore(postId)
}
</script>

<template>
  <section class="posts-list-view article-section">
    <h2>Posts List</h2>

    <button type="button" @click="goToNewPost">New Post</button>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <div>
          <RouterLink :to="{ name: 'router.route-meta-fields.post-detail', params: { id: post.id } }">{{
            post.title
          }}</RouterLink>
          <button
            v-if="isLoggedIn"
            class="delete"
            type="button"
            :aria-label="`Delete ${post.title}`"
            @click="removePost(post.id)"
          ></button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="css" scoped>
.posts-list-view {
  ul > li {
    border-radius: var(--app-radius-md);
    transition: background-color 0.2s ease;

    &:hover,
    &:focus-within {
      background-color: color-mix(in srgb, var(--app-surface-card) 90%, transparent);
    }
  }

  ul > li > div {
    display: flex;
    gap: var(--app-spacing-md);
    align-items: center;
    width: 100%;
    padding: 2px var(--app-spacing-sm);

    & *:first-child {
      flex: 1 1 auto;
    }
  }

  button.delete {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    color: transparent;
    cursor: pointer;
    background-color: color-mix(in srgb, var(--app-color-error) 10%, transparent);
    border: none;
    border-radius: var(--app-radius-full);
    opacity: 0;
    transition:
      opacity 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &::after {
      position: relative;
      z-index: 1;
      display: block;
      width: 1rem;
      height: 1rem;
      content: '';
      background-color: var(--app-color-error);
      mask-image: url('@/assets/material-symbols/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }

    &:hover,
    &:focus-visible {
      background-color: color-mix(in srgb, var(--app-color-error) 10%, transparent);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--app-color-error) 20%, transparent);
      transform: scale(1.05);

      &::before {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  ul > li:hover button.delete,
  ul > li:focus-within button.delete {
    opacity: 1;
  }
}
</style>
