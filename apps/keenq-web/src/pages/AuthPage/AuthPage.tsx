import { useStore } from '@nanostores/preact'
import { Navigate, Outlet } from 'react-router-dom'

import { $isAuthed } from '@/services/auth'


function AuthPage() {
	const isAuthed = useStore($isAuthed)
	if (isAuthed) return <Navigate to='/' />
	return (
		<div data-testid='AuthPage'>
			<Outlet />
		</div>
	)
}

export default AuthPage
