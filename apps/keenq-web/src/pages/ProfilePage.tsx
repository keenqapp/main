import { Navigate } from 'react-router-dom'

import { useApi } from '@/services/api'

import Page from '@/ui/Page'

import Profile from '@/components/Profile'

export default function ProfilePage() {

  const api = useApi()
  const user = api.members.currentMember

  if (!user) return <Navigate to='/' />

  return (
    <Page data-testid='ProfilePage'>
      <Profile {...user} />
    </Page>
  )
}
