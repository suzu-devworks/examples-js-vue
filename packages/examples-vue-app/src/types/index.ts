export interface IMenu {
  title: string
  description?: string
  groups: IMenuGroup[]
}

export interface IMenuGroup {
  title: string
  items: IMenuItem[]
}

export interface IMenuItem {
  title: string
  to?: string
  link?: string
}
