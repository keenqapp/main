import { Navigate, useParams } from 'react-router-dom'


import { useApi } from '@/services/api'

import Page from '@/ui/Page'

import Match from '@/components/Match'

function MatchPage() {
  const { eventId } = useParams()
  if (!eventId) return <Navigate to='/' />

  const api = useApi()
  const event = api.events.getByUid(eventId)
  if (!event) return <Navigate to='/' />

  return (
    <Page data-testid='MatchPage'>
      <Match {...event} />
    </Page>
  )
}

export default MatchPage
