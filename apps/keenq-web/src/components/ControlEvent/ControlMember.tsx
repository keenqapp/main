import { useState } from 'react'
import styled from '@emotion/styled'


import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Avatar, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IEventMember } from '@/services/events'

import Space from '@/ui/Space'

function getColor(status: IEventMember['status'], theme: Theme) {
  switch (status) {
  case 'active':
    return theme.palette.primary.light
  case 'pending':
    return theme.palette.secondary.light
  case 'inactive':
    return theme.palette.error.light
  default:
    return theme.palette.primary.light
  }
}

const should = { shouldForwardProp: (prop: string) => prop !== 'status' }
const StyledCard = styled(Card, should)<{ status: IEventMember['status'] }>`
  background-color: ${({ status, theme }) => getColor(status, theme)};
`

interface Props {
  uid: string
}

function ControlMember({ uid }: Props) {

  const api = useApi()

  const member = api.members.getByUid(uid)
  const eventMember = api.events.getEventMember(uid)
  if (!member || !eventMember) return null

  const { name, avatar } = member
  const { status } = eventMember

  const handleStatus = (status: IEventMember['status']) => () => {
    api.events.participateForMember(api.events.currentUid!, uid, status)
  }

  return (
    <StyledCard data-testid='ControlMember' status={status}>
      <CardContent>
        <Stack direction='row' alignItems='center'>
          <Avatar src={`${avatar}?img=${uid}`} alt={name} />
          <Space />
          <Typography variant='subtitle1'>{name}</Typography>
          <Space grow />
          {status === 'active'
            ? <Button variant='outlined' startIcon={<VisibilityTwoToneIcon />} onClick={handleStatus('inactive')}>Participating</Button>
            : <Button
              variant='outlined'
              startIcon={<VisibilityOffTwoToneIcon />}
              onClick={handleStatus('active')}
              color='warning'>No</Button>
          }
        </Stack>
      </CardContent>
    </StyledCard>
  )
}

export default ControlMember
