import { useState } from 'react'


import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IEvent } from '@/services/events'

import Container from '@/ui/Container'
import Expand from '@/ui/Expand'
import Space from '@/ui/Space'

import MatchMember from '@/components/Match/MatchMember'

type Props = Pick<IEvent, 'members'>

function MatchMembers({ members }: Props) {
  const [ expanded, setExpanded ] = useState(true)
  const handleExpand = () => setExpanded(prev => !prev)
  const api = useApi()

  return (
    <Container data-testid='RoundMembers'>
      <Stack direction='row' alignItems='center' >
        <Typography variant='h4'>Members</Typography>
        <Typography variant='overline'>{members?.length - 1} people</Typography>
        <Space grow />
        <Expand expanded={expanded} onClick={handleExpand} />
      </Stack>
      <Collapse in={expanded}>
        <Stack spacing={2}>
          {members
            .filter(eventMember => {
              if (eventMember.uid === api.members.currentMemberUid) return false
              return eventMember.status !== 'pending'
            })
            .map(({ uid }) => <MatchMember key={uid} uid={uid} />)
          }
        </Stack>
      </Collapse>
    </Container>
  )
}

export default MatchMembers
