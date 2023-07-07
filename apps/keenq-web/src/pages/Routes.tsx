import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/core/Layout'
import AuthPage from '@/pages/AuthPage'
import LoginPage from '@/pages/AuthPage/LoginPage'
import EventPage from '@/pages/EventPage'
import EventsPage from '@/pages/EventsPage'
import IndexPage from '@/pages/IndexPage'
import MatchPage from '@/pages/MatchPage'
import ProfilePage from '@/pages/ProfilePage'
import RoomInfoPage from '@/pages/RoomInfoPage'
import RoomPage from '@/pages/RoomPage'
import RoomsPage from '@/pages/RoomsPage'


const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <div>404</div>,
		children: [
			{
				index: true,
				element: <IndexPage />,
			},
			{
				path: 'match',
				element: <MatchPage />,
			},
			{
				path: '/match/:id',
				element: <MatchPage />,
			},
			{
				path: '/room',
				element: <RoomsPage />,
			},
			{
				path: '/room/:id',
				element: <RoomPage />,
			},
			{
				path: '/room/:id/info',
				element: <RoomInfoPage />,
			},
			{
				path: '/event',
				element: <EventsPage />,
			},
			{
				path: '/event/:id',
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
