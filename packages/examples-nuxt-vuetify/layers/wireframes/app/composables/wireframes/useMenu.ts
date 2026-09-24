export function useMenu() {
  const prefix = '/wireframes'
  const menuItems = [
    { to: '/', title: 'Home', prependIcon: 'mdi-home' },
    { to: `${prefix}/baseline`, title: 'Baseline', prependIcon: 'mdi-application-outline' },
    { to: `${prefix}/extended-toolbar`, title: 'Extended Toolbar', prependIcon: 'mdi-page-layout-header' },
    { to: `${prefix}/system-bar`, title: 'System Bar', prependIcon: 'mdi-window-maximize' },
    { to: `${prefix}/inbox`, title: 'Inbox', prependIcon: 'mdi-inbox-arrow-down' },
    { to: `${prefix}/constrained`, title: 'Constrained', prependIcon: 'mdi-arrow-collapse-horizontal' },
    { to: `${prefix}/side-navigation`, title: 'Side Navigation', prependIcon: 'mdi-page-layout-sidebar-left' },
    { to: `${prefix}/three-column`, title: 'Three Column', prependIcon: 'mdi-view-column-outline' },
    { to: `${prefix}/discord`, title: 'Discord', prependIcon: 'mdi-forum' },
    { to: `${prefix}/steam`, title: 'Steam', prependIcon: 'mdi-steam' },
  ]

  return {
    menuItems: computed(() => menuItems),
  }
}
