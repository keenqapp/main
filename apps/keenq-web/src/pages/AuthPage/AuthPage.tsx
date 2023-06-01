import { Navigate, Outlet } from 'react-router-dom'

import { isAuthed } from '@/services/auth'



function AuthPage() {
  console.log('--- AuthPage.tsx:8 -> AuthPage -> isAuthed.value', isAuthed.value)
  if (isAuthed.value) return <Navigate to='/' />

  return (
    <div data-testid='AuthPage'>
      <Outlet />
    </div>
  )
}

export default AuthPage
