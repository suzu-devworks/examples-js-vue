export type InboxCard = { title: string }
export type InboxLink = [icon: string, text: string]

export const useInboxStore = defineStore('wireframes/inbox', () => {
  const cards = ref<InboxCard[]>([])
  const links = ref<InboxLink[]>([])
  const initialized = ref(false)

  return {
    cards,
    initialized,
    links,
  }
})
