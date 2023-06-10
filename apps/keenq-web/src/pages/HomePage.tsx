import { Navigate } from 'react-router-dom'

import { isAuthed } from '@/services/auth'

import Page from '@/ui/Page'

// import AllEvents from '@/components/AllEvents'
// import MyEvents from '@/components/MyEvents'

export default function HomePage() {
  if (!isAuthed.value) return <Navigate to='/auth/login' />
  return (
    <Page data-testid='HomePage'>
      HomePage
      111222
      {/*<MyEvents />*/}
      {/*<AllEvents />*/}
    </Page>
  )
}
