import { Navigate, Outlet } from 'react-router-dom'

import { $isAuthed } from '@/services/auth'


function AuthPage() {
	if ($isAuthed.get()) return <Navigate to='/' />
	return (
		<div data-testid='AuthPage'>
			<Outlet />
		</div>
	)
}

export default AuthPage
