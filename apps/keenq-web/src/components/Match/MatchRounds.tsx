import styled from '@emotion/styled'


import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'

import Container from '@/ui/Container'

import MatchRound from '@/components/Match/MatchRound'

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.palette.primary.light};
`

function MatchFinished() {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant='h5' align='center'>Event finished</Typography>
      </CardContent>
    </StyledCard>
  )
}

function MatchRounds() {

  const api = useApi()

  const rounds = api.rounds.getForEvent()
  const { status } = api.events.current!

  return (
    <Container data-testid='Rounds'>
      <Typography variant='h4'>Rounds</Typography>
      <Stack spacing={2}>
        {rounds.map((round) => <MatchRound key={round.uid} {...round} />)}
        {status === 'finished' && <MatchFinished />}
      </Stack>
    </Container>
  )
}

export default MatchRounds
