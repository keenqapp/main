import {
  createBrowserRouter,
  defer,
  redirect,
  RouterProvider
} from 'react-router-dom'

import AuthPage from '@/pages/AuthPage'
import LoginPage from '@/pages/AuthPage/LoginPage'
import ControlEventPage from '@/pages/ControlEventPage'
import CreateEventPage from '@/pages/CreateEventPage'
import EditEventPage from '@/pages/EditEventPage'
import EventPage from '@/pages/EventPage'
import HomePage from '@/pages/HomePage'
import MatchPage from '@/pages/MatchPage'
import ProfilePage from '@/pages/ProfilePage'
import ResultsPage from '@/pages/ResultsPage'
import RootPage from '@/pages/RootPage'
import { FC, ReactNode } from 'react'

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
      // {
      //   path: '/profile',
      //   element: <ProfilePage />
      // },
      // {
      //   path: '/results',
      //   element: <ResultsPage />,
      //   loader: async () => {
      //     const loaded = api.results.loadByTo()
      //     return defer({ data: loaded })
      //   }
      // },
      // {
      //   path: '/events/create',
      //   element: <CreateEventPage />,
      // },
      // {
      //   path: '/events/:eventId/edit',
      //   element: <EditEventPage />,
      //   loader: async ({ params }) => {
      //     if (!params.eventId) return redirect('/')
      //     api.events.setCurrentUid(params.eventId)
      //     return defer({ data: api.events.loadEvent(params.eventId) })
      //   },
      // },
      // {
      //   path: '/events/:eventId/control',
      //   element: <ControlEventPage />,
      //   loader: async ({ params }) => {
      //     if (!params.eventId) return redirect('/')
      //     api.events.setCurrentUid(params.eventId)
      //     await api.events.loadEvent(params.eventId)
      //     const members = api.members.loadForEvent(params.eventId)
      //     const rounds = api.rounds.loadForEvent(params.eventId)
      //     return defer({ data: Promise.all([members, rounds]) })
      //   },
      // },
      // {
      //   path: '/events/:eventId',
      //   element: <EventPage />,
      //   loader: async ({ params }) => {
      //     if (!params.eventId) return redirect('/')
      //     api.events.setCurrentUid(params.eventId)
      //     return defer({ data: api.events.loadEvent(params.eventId) })
      //   },
      // },
      // {
      //   path: '/events/:eventId/match',
      //   element: <MatchPage />,
      //   loader: async ({ params }) => {
      //     if (!params.eventId) return redirect('/')
      //     api.events.setCurrentUid(params.eventId)
      //     await api.events.loadEvent(params.eventId)
      //     const members = api.members.loadForEvent(params.eventId)
      //     const rounds = api.rounds.loadForEvent(params.eventId)
      //     const results = api.results.loadByEventAndFrom()
      //     return defer({ data: Promise.all([members, rounds, results]) })
      //   }
      // }
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
      // {
      //   path: '/register',
      //   element: <AuthPage />,
      // }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={routes} />
}
