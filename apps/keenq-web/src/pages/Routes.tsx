import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/core/Layout.tsx'
import AuthPage from '@/pages/AuthPage'
import LoginPage from '@/pages/AuthPage/LoginPage'
import HomePage from '@/pages/HomePage'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
