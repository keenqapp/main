import styled from '@emotion/styled'


import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import DoDisturbOnTwoToneIcon from '@mui/icons-material/DoDisturbOnTwoTone'
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { useApi } from '@/services/api'

interface Props {
  uid: string
  status: string
}

function ControlEventActions({ uid }: Props) {

  const api = useApi()
  const { status, registrationClosed } = api.events.getByUid(uid)!

  const handleStart = () => api.events.start(uid)
  const handleFinish = () => api.events.finish(uid)
  const handleResume = () => api.events.start(uid)
  const handleClose = () => api.events.close(uid, ['all'])
  const handleOpen = () => api.events.open(uid, ['all'])
  const handleDelete = () => api.events.delete(uid)

  const isClosed = registrationClosed.closedFor?.includes('all')

  return (
    <div data-testid='ControlEventActions'>
      <Stack spacing={2}>
        {status === 'pending' && (
          <Button
            variant='contained'
            color='success'
            size='large'
            startIcon={<PlayArrowTwoToneIcon />}
            onClick={handleStart}
          >Start event</Button>
        )}
        {status === 'started' && (
          <Button
            variant='contained'
            color='warning'
            size='large'
            startIcon={<PlayArrowTwoToneIcon />}
            onClick={handleFinish}
          >Finish event</Button>
        )}
        {status === 'finished' && (
          <Button
            variant='contained'
            color='warning'
            size='large'
            startIcon={<PlayArrowTwoToneIcon />}
            onClick={handleResume}
          >Resume event</Button>
        )}
        {!isClosed
          ? (
            <Button
              variant='outlined'
              color='warning'
              size='large'
              startIcon={<DoDisturbOnTwoToneIcon />}
              onClick={handleClose}
            >Close registration</Button>
          )
          : (
            <Button
              variant='outlined'
              size='large'
              startIcon={<DoDisturbOnTwoToneIcon />}
              onClick={handleOpen}
            >Open registration</Button>
          )}
        <Button
          color='error'
          size='large'
          startIcon={<CloseTwoToneIcon />}
          onClick={handleDelete}
        >Cancel event</Button>
      </Stack>
    </div>
  )
}

export default ControlEventActions
