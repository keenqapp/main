import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDays, formatDistanceToNow, isPast } from 'date-fns'


import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'

import EventActionsMenu from '@/components/Event/EventActionsMenu'

interface Props {
  uid: string
}

function EventActions({ uid }: Props) {

  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const setMenuOpen = (open: boolean) => () => setIsMenuOpen(open)

  const api = useApi()
  const navigate = useNavigate()

  const { startDate, status, registrationClosed } = api.events.getByUid(uid)!

  const hasFinished = status === 'finished' || isPast(addDays(startDate.toDate(), 3)) // TODO be careful with this 'addDays'
  const inPast = isPast(new Date(startDate.toDate()))
  const isClosed = api.events.checkClosed(registrationClosed)
  const isMember = api.events.checkMember(uid)
  const isAdmin = api.events.checkAdmin(uid)

  const handleJoin = () => api.events.join()
  const handleHere = () => {
    api.events.here()
    navigate(`/events/${uid}/match`)
  }
  const handleSignIn = () => navigate('/auth/login')

  const showMenu = isAdmin || (isMember && !isClosed && !hasFinished)

  function getButton() {
    if (hasFinished) return <Typography variant='overline'>Event Finished</Typography>
    if (isClosed) return <Typography variant='overline' color='error'>Registration closed</Typography>
    if (!api.user.isAuthed) return <Button onClick={handleSignIn}>SignIn to join</Button>
    if (!isMember) return <Button variant='contained' color='secondary' onClick={handleJoin}>Join now</Button>
    if (status === 'pending' && inPast) return <Typography variant='overline' color='error'>Event is about to start</Typography>
    if (status === 'pending') return <Typography variant='overline'>Will start in {formatDistanceToNow(startDate.toDate())}</Typography>
    if (status === 'started') return <Button variant='contained' color='primary' onClick={handleHere}>I&apos;m here!</Button>
  }

  return (
    <Stack
      spacing={1}
      direction={showMenu ? 'row' : 'column'}
      justifyContent='space-between'
      alignItems='center'
      flex={1}
    >
      <EventActionsMenu uid={uid} open={isMenuOpen} toggleMenuOpen={setMenuOpen} />
      {showMenu && <Button onClick={setMenuOpen(true)}>Actions</Button>}
      {getButton()}
    </Stack>
  )
}

export default EventActions
