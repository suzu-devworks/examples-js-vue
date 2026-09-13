<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import data from '../data/users.json'

const route = useRoute()
const currentId = computed(() => Number(route.params['id']))
const user = computed(() => data.users.find((u) => u.id === currentId.value))
</script>

<template>
  <main class="user-view article-page">
    <header>
      <h1>Per-Route Guard example</h1>
      <p>Advanced / Navigation Guards</p>
    </header>

    <section class="article-section">
      <h2>User Information</h2>
      <p>This section displays the details of a specific user.</p>

      <div v-if="currentId" class="article-example">
        <div v-if="!user">User not found.</div>
        <div v-else class="user-details">
          <h3>{{ user.name }}</h3>
          <ul>
            <li>Role: {{ user.role }}</li>
            <li>Email: {{ user.email }}</li>
            <li>Description: {{ user.description }}</li>
          </ul>
        </div>
      </div>

      <div class="article-example">
        <h3>Links</h3>
        <p><code>users/:id</code> removes the query and hash, while <code>about</code> removes only the query.</p>
        <p>
          <strong>
            However,In the following example, the guard executes when navigating between <code>users/:id</code> and
            <code>about</code>, but not when navigating within <code>users/:id</code>.</strong
          >
        </p>
        <ul>
          <li>
            <RouterLink to="/router/guide/advanced/navigation-guards/users/1?admin=true&ln=ja"
              >/router/guide/advanced/navigation-guards/users/1?admin=true&ln=ja</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/router/guide/advanced/navigation-guards/users/2#info"
              >/router/guide/advanced/navigation-guards/users/2#info</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/router/guide/advanced/navigation-guards/users/3?culprit=true#info"
              >/router/guide/advanced/navigation-guards/users/3?culprit=true#info</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/router/guide/advanced/navigation-guards/about?query=true#project"
              >/router/guide/advanced/navigation-guards/about?query=true#project</RouterLink
            >
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
