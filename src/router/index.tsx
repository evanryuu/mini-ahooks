import VirtualList from '@/components/VirtualList'
import Root from './Root'
import { createBrowserRouter } from 'react-router-dom'
import ClickAway from '@/components/ClickAway'

const routes = [
  {
    path: '/mini-ahooks',
    element: <Root />,
    children: [
      {
        path: 'useVirtualList',
        element: <VirtualList />,
      },
      {
        path: 'useClickAway',
        element: <ClickAway />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export { routes, router, router as default }
