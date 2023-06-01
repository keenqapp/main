import { Navigate, useParams } from 'react-router-dom'


import { useApi } from '@/services/api'

import Page from '@/ui/Page'

import Event from '@/components/Event'

function EventPage() {

  const api = useApi()

  const { eventId } = useParams()
  if (!eventId) return <Navigate to='/' />
  const event = api.events.getByUid(eventId)!

  return (
    <Page data-testid='EventPage'>
      <Event {...event} />
    </Page>
  )
}

export default EventPage
