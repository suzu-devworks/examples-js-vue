import vueLogo from '@/assets/logo.svg'
import viteLogo from '@/assets/vite.svg'

const features = [
  {
    to: '/templates',
    title: '🎁 Template generated with create-vue',
    description: 'This is a template page generated using the `create-vue` command.',
  },
  {
    to: '/software-design',
    title: '📘 Articles of Software Design',
    description: 'This content is based on the feature article from the Software Design.',
  },
  {
    to: '/vue',
    imageUrl: vueLogo,
    title: 'Vue Guide',
    description: 'The content is based on the documentation from the official Vue.js website.',
  },
  {
    to: '/router',
    imageUrl: vueLogo,
    title: 'Vue Router Guide',
    description: 'The content is based on the documentation from the official Vue Router website.',
  },
  {
    to: '/vite',
    imageUrl: viteLogo,
    title: 'Vite Guide',
    description: 'This content is based on the documentation from the official Vite website.',
  },
]

export { features }
