import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/core/Layout'
import AuthPage from '@/pages/AuthPage'
import LoginPage from '@/pages/AuthPage/LoginPage'
import EventPage from '@/pages/EventPage'
import EventsPage from '@/pages/EventsPage'
import MatchPage from '@/pages/MatchPage'
import ProfilePage from '@/pages/ProfilePage'
import RoomPage from '@/pages/RoomPage'
import RoomsPage from '@/pages/RoomsPage'


const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>404</div>,
		children: [
			{
				path: '/match',
				element: <MatchPage />,
			},
			{
				path: '/room',
				element: <RoomsPage />,
			},
			{
				path: '/room/:uid',
				element: <RoomPage />,
			},
			{
				path: '/event',
				element: <EventsPage />,
			},
			{
				path: '/event/:uid',
				element: <EventPage />,
			},
			{
				path: '/profile',
				element: <ProfilePage />,
			}
		]
	},
	{
		path: '/auth',
		element: <AuthPage />,
		children: [
			{
				path: '/auth/login',
				element: <LoginPage />,
			}
		]
	}
])

export default function Router() {
	return <RouterProvider router={routes} />
}
