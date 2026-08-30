import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface Store {
  user_id: string
}

// Setup Stores style.
export const useGlobalProfileStore = defineStore('globalProfile', () => {
  const profile: Ref<Store | null> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<Error | null> = ref(null)

  function setGithubProfile(payload: Store): void {
    profile.value = payload
  }

  async function fetchGithubProfile(payload: Store): Promise<void> {
    if (profile.value != null) {
      return
    }

    error.value = null
    loading.value = true
    try {
      const response = await fetch(`https://api.github.com/users/${payload.user_id}`)
      setGithubProfile(await response.json())
    } catch (ex) {
      error.value = ex as Error
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    setGithubProfile,
    fetchGithubProfile,
  }
})
