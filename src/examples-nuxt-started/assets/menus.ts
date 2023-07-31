// https://nuxt.com/docs/getting-started/routing

import { NaviItemPorps } from "components/AppNaviItem.vue"

export const menus: NaviItemPorps[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Assets",
    link: "/assets",
  },
  {
    title: "Styling",
    link: "/styling",
  },
  {
    title: "Routing",
    children: [
      {
        title: "Post 1",
        link: "/routing/posts/1",
      },
      {
        title: "Post 2",
        link: "/routing/posts/2",
      },
      {
        title: "Post A",
        link: "/routing/posts/A",
        caption: "failed",
      },
      {
        title: "Dashboard",
        link: "/routing/dashboard",
        caption: "require from home",
      },
    ],
  },
  {
    title: "SEO and Meta",
    link: "/seo-meta",
  },
  {
    title: "Transitions",
    children: [
      {
        title: "Layout Transition",
        link: "/transitions/anothor",
      },
      {
        title: "Hooks",
        link: "/transitions/hooks",
      },
      {
        title: "Dynamic Transition",
        link: "/transitions/numbers/1",
      },
    ],
  },
  {
    title: "Data fetching",
    children: [
      {
        title: "Using specific composables",
        link: "/data/composable",
      },
      {
        title: "Options",
        link: "/data/options",
      },
      {
        title: "Passing Headers and cookies",
        link: "/data/cookies",
      },
      {
        title: "Serialization",
        link: "/data/serialization",
      },
    ],
  },
  {
    title: "State Management",
    link: "/states",
  },
  {
    title: "Original home",
    link: "/original",
  },
]
