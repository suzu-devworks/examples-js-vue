const items = [
  {
    label: 'Introduction',
    to: '/interactions',
  },
  {
    label: 'i18n',
    to: '/i18n',
  },
]

export function useAppMenu() {
  const route = useRoute()

  return {
    items: computed(() =>
      items.map((item) => ({
        ...item,
        active: route.path.replace(/\/$/, '') === item.to,
      })),
    ),
  }
}
