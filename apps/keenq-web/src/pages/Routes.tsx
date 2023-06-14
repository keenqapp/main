import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes, Switch } from 'react-router-dom'

import Layout from '@/core/Layout'
import AuthPage from '@/pages/AuthPage'
import LoginPage from '@/pages/AuthPage/LoginPage'
import EventPage from '@/pages/EventPage'
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

// export default function Router() {
// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path='/' element={<Layout />} />
// 				<Route path='/match' element={<MatchPage />} />
//
// 				<Route path='/auth' element={<AuthPage />} />
// 				<Route path='/auth/login' element={<LoginPage />} />
//
// 				<Route path='/' element={<Navigate to='/match' />} />
// 			</Routes>
// 		</BrowserRouter>
// 	)
// }
