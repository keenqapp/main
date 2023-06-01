import { Navigate, useParams } from 'react-router-dom'


import { useApi } from '@/services/api'

import Page from '@/ui/Page'

import EventForm from '@/components/EventForm'

function EditEventPage() {
  const { eventId } = useParams()
  if (!eventId) return <Navigate to='/' />

  const api = useApi()
  const event = api.events.getByUid(eventId)

  return (
    <Page data-testid='EditEventPage'>
      <EventForm event={event} />
    </Page>
  )
}

export default EditEventPage
