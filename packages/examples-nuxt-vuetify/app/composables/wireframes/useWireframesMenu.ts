export function useWireframesMenu() {
  const prefix = '/wireframes'
  const links = [
    { title: 'Baseline', path: `${prefix}/baseline`, icon: 'mdi-application-outline' },
    { title: 'Extended Toolbar', path: `${prefix}/extended-toolbar`, icon: 'mdi-page-layout-header' },
    { title: 'System Bar', path: `${prefix}/system-bar`, icon: 'mdi-window-maximize' },
    { title: 'Inbox', path: `${prefix}/inbox`, icon: 'mdi-inbox-arrow-down' },
    { title: 'Constrained', path: `${prefix}/constrained`, icon: 'mdi-arrow-collapse-horizontal' },
    { title: 'Side Navigation', path: `${prefix}/side-navigation`, icon: 'mdi-page-layout-sidebar-left' },
    { title: 'Three Column', path: `${prefix}/three-column`, icon: 'mdi-view-column-outline' },
    { title: 'Discord', path: `${prefix}/discord`, icon: 'mdi-forum' },
    { title: 'Steam', path: `${prefix}/steam`, icon: 'mdi-steam' },
  ]

  return {
    links: computed(() => links),
  }
}
