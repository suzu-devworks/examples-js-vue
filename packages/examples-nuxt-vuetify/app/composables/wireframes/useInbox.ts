import type { InboxCard, InboxLink } from '~/stores/wireframes/inbox'
import { useInboxStore } from '~/stores/wireframes/inbox'

export function useInbox() {
  const inboxStore = useInboxStore()
  const defaultCards: InboxCard[] = [{ title: 'Today' }, { title: 'Yesterday' }]
  const defaultLinks: InboxLink[] = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-delete', 'Trash'],
    ['mdi-alert-octagon', 'Spam'],
  ]

  if (!inboxStore.initialized) {
    inboxStore.cards = [...defaultCards]
    inboxStore.links = defaultLinks.map(([icon, text]) => [icon, text])
    inboxStore.initialized = true
  }

  return {
    cards: computed(() => inboxStore.cards),
    links: computed(() => inboxStore.links),
  }
}
