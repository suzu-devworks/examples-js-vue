import { defineStore } from 'pinia'
import { ref } from 'vue'

import data from '../data/posts.json'

export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string | Date
}

export const usePostsStore = defineStore('Posts', () => {
  const posts = ref<Post[]>([...data.posts])

  function addPosts(newPosts: Post) {
    posts.value.push(newPosts)
  }

  function removePost(postId: number) {
    posts.value = posts.value.filter((post) => post.id !== postId)
  }

  return {
    posts,
    addPosts,
    removePost,
  }
})
