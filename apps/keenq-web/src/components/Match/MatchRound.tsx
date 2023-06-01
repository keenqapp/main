import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IRound } from '@/services/rounds'

import MatchPair from '@/components/Match/MatchPair'
import EmptyMatchPairMember from '@/components/Match/EmptyMatchPairMember'

const Title = styled(Typography)`
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(1)};
`

type Props = IRound

function MatchRound({ uid, index }: Props) {

  const api = useApi()
  const pair = api.rounds.getPairForRound(uid)

  return (
    <div data-testid='MatchRound'>
      <Title variant='overline'>Round {index}</Title>
      {pair
        ? <MatchPair {...pair} />
        : <EmptyMatchPairMember />
      }
    </div>
  )
}

export default MatchRound
