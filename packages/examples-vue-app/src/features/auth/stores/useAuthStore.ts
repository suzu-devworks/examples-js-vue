import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('Auth', () => {
  const account = ref<{ id: string; token: string; expiry: number } | null>(null)

  function login(loginAccount: { id: string; password: string }) {
    // This authentication is just for the sample.
    // please put in more effort for the actual implementation.
    const token = crypto.randomUUID()
    const expiry = Temporal.Now.instant().add({ minutes: 5 }).epochMilliseconds
    account.value = { id: loginAccount.id, token, expiry }

    return { success: true, error: '' }
  }

  function logout() {
    account.value = null
  }

  function isAuthenticated() {
    if (!account.value) return false
    if (account.value.expiry <= Temporal.Now.instant().epochMilliseconds) {
      logout()
      return false
    }
    return true
  }

  return {
    account,
    isAuthenticated,
    login,
    logout,
  }
})
