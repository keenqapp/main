import { Navigate, useParams } from 'react-router-dom'


import { useApi } from '@/services/api'

import Page from '@/ui/Page'
import ControlEvent from '@/components/ControlEvent'

interface Props {}

function ControlEventPage() {
  const { eventId } = useParams()
  if (!eventId) return <Navigate to='/' />

  const api = useApi()
  const event = api.events.getByUid(eventId)!

  return (
    <Page data-testid='ControlEventPage'>
      <ControlEvent {...event} />
    </Page>
  )
}

export default ControlEventPage
