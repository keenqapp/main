import styled from '@emotion/styled'


import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Avatar } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'

import Space from '@/ui/Space'

const should = { shouldForwardProp: (prop: string) => prop !== 'see' && prop !== 'isActive' }
const StyledCard = styled(Card, should)<{ see: boolean, isActive: boolean }>`
  background-color: ${({ see, theme }) => see ? theme.palette.primary.light : theme.palette.error.light};
  opacity: ${({ isActive }) => isActive ? 1 : 0.6};
`

interface Props {
  uid: string
}

function MatchMember({ uid }: Props) {

  const api = useApi()

  const member = api.members.getByUid(uid)
  const eventMember = api.events.getEventMember(uid)
  const currentEventMember = api.events.currentEventMember
  if (!member || !currentEventMember || !eventMember) return null

  const { name, avatar, uid: eventMemberUid } = member
  const { status } = eventMember
  const { dont } = currentEventMember

  const isActive = status === 'active'
  const isWanted = !dont.includes(eventMemberUid) && isActive

  const handleSee = (want: boolean) => () => api.events.dont(uid, want)

  return (
    <StyledCard data-testid='RoundMember' see={isWanted} isActive={isActive}>
      <CardContent>
        <Stack direction='row' alignItems='center'>
          <Avatar src={`${avatar}?img=${uid}`} alt={name} />
          <Space />
          <Typography variant='subtitle1'>{name}</Typography>
          <Space grow />
          {isWanted
            ? <Button
              variant='outlined'
              startIcon={<VisibilityTwoToneIcon />}
              onClick={handleSee(false)}
              disabled={!isActive}
            >Yes</Button>
            : <Button
              variant='outlined'
              startIcon={<VisibilityOffTwoToneIcon />}
              onClick={handleSee(true)}
              color='warning'
              disabled={!isActive}
            >No</Button>
          }
        </Stack>
      </CardContent>
    </StyledCard>
  )
}

export default MatchMember
