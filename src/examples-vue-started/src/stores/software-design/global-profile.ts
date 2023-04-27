import { ref, type Ref } from "vue"
import { defineStore } from "pinia"

export interface Store {
  user_id: string
}

// Setup Stores style.
export const useGlobalProfileStore = defineStore("globalProfile", () => {
  const profile: Ref<Store | null> = ref(null)

  function setGithubProfile(payload: Store): void {
    profile.value = payload
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchGithubProfile(payload: Store): Promise<void> {
    if (profile.value != null) {
      return
    }

    const response = await fetch(`https://api.github.com/users/${payload.user_id}`).then((res) => {
      return res.json()
    })

    setGithubProfile(response)
  }

  return { profile, setGithubProfile, fetchGithubProfile }
})
