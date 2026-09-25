export function useGlidingNavigation() {
  const menu = ref(false)
  const activator = ref()
  const menuItems = ref<unknown[]>([])
  const menuMoving = ref(false)

  let closeTimeout = -1
  let movingTimeout = -1

  function activate({ currentTarget }: Event & { currentTarget: EventTarget }, submenu?: unknown[]) {
    clearTimeout(closeTimeout)
    clearTimeout(movingTimeout)

    if (menu.value) {
      menuMoving.value = true
      movingTimeout = window.setTimeout(() => (menuMoving.value = false), 300)
    }

    activator.value = currentTarget
    menuItems.value = submenu ?? []

    menu.value = true
  }

  function onListEnter() {
    clearTimeout(closeTimeout)
  }

  function delayedClose() {
    clearTimeout(closeTimeout)
    closeTimeout = window.setTimeout(() => (menu.value = false), 600)
  }

  return {
    menu,
    activator,
    menuMoving,
    activate,
    onListEnter,
    delayedClose,
  }
}
