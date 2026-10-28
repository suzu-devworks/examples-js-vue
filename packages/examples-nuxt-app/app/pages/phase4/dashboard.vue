<script setup lang="ts">
import { useAuthorizedFetch, useAuthToken, navigateTo, definePageMeta, useRoute } from '#imports'

// Apply root middleware to the page
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const { clearToken } = useAuthToken()
const { data: profile, error } = await useAuthorizedFetch('/api/phase4/profile')

const handleLogout = () => {
  clearToken()
  navigateTo({
    path: '/phase4/login',
    query: { redirect: route.fullPath },
  })
}
</script>

<template>
  <article>
    <header>
      <h2>Step 14: Protected Dashboard (Route Middleware)</h2>
    </header>

    <section>
      <div v-if="profile" class="card">
        <h3>Welcome, {{ profile.name }}!</h3>
        <p>You have successfully passed the route middleware unauthenticated-user guard.</p>

        <div class="grid">
          <button class="secondary outline" @click="handleLogout">Logout</button>
          <div></div>
        </div>
      </div>
      <div v-else-if="error">
        <p class="error">Failed to load profile data.</p>
        <button @click="handleLogout">Back to Login</button>
      </div>
    </section>
  </article>
</template>

<style scoped>
.error {
  color: var(--pico-del-color);
}
</style>
