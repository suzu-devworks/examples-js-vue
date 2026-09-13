<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/useAuthStore'

const router = useRouter()
const route = useRoute()
const { account, isAuthenticated, logout } = useAuthStore()
const isLoggedIn = computed(() => isAuthenticated())

const onLogin = () => {
  router.push({ name: 'auth.login', query: { redirect: route.fullPath } })
}

const onLogout = () => {
  logout()
}
</script>

<template>
  <div class="account-panel">
    <span v-if="isLoggedIn">{{ account?.id }}</span>
    <a v-if="isLoggedIn" @click="onLogout">Logout</a>
    <a v-if="!isLoggedIn" @click="onLogin">Login</a>
  </div>
</template>

<style lang="css" scoped>
.account-panel {
  display: flex;
  gap: var(--app-spacing-xs);
  align-items: center;
  justify-content: center;

  > a,
  > span {
    display: inline-block;
    padding: var(--app-spacing-xs);
    border-radius: var(--app-radius-sm);
  }

  > a {
    cursor: pointer;
  }
}
</style>
