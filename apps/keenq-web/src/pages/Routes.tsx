import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import AuthPage from '@/pages/AuthPage'
import LoginPage from '@/pages/AuthPage/LoginPage'
import HomePage from '@/pages/HomePage'
import RootPage from '@/pages/RootPage'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
        index: true,
      },
    ]
  }
])

export default function Router() {
  return <RouterProvider router={routes} />
}
