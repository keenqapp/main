import { useEffect, useState } from 'react'
import styled from '@emotion/styled'


import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone'
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IRound } from '@/services/rounds'

import Space from '@/ui/Space'

import ControlRoundTimer from '@/components/ControlEvent/ControlRoundTimer'

const Title = styled(Typography)`
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(1)};
`

type Props = IRound & { duration: number }

function MatchRound({ uid, duration }: Props) {
  const api = useApi()

  const round = api.rounds.getByUid(uid)
  const { index, pairs, secondsLeft, status } = round!
  const [ left, setLeft ] = useState(secondsLeft)

  const canStart = api.rounds.checkStart(uid)

  const handleStart = () => {
    const diff = !left ? duration * 60 : left
    setLeft(diff)
    api.rounds.start(uid, diff)
  }
  const handlePause = () => {
    api.rounds.pause(uid, left!)
  }

  useEffect(() => {
    if (left === 0 && status === 'started') api.rounds.finish(uid)
  }, [ left, uid, status ])

  function getButton() {
    if (status === 'finished') return <><Typography variant='overline' align='center'>Round finished</Typography><Space /></>
    if (status === 'started') return (
      <Button
        variant='outlined'
        startIcon={<PauseCircleFilledTwoToneIcon />}
        fullWidth
        color='secondary'
        onClick={handlePause}
      >Pause</Button>
    )
    return (
      <Button
        variant='outlined'
        startIcon={<PlayArrowTwoToneIcon />}
        onClick={handleStart}
        disabled={!canStart}
      >Start</Button>
    )
  }

  return (
    <div data-testid='MatchRound'>
      <Title variant='overline'>Round {index}</Title>
      <Space />
      <Card data-testid='MatchPairMember'>
        <CardContent>
          <Stack direction='row' alignItems='center'>
            <Typography variant='h6'>Pairs</Typography>
            <Space />
            <Typography variant='overline'>{pairs.length}</Typography>
            <Space grow />
            <ControlRoundTimer left={left!} status={status!} onChange={setLeft} />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack flex={1}>
            {getButton()}
          </Stack>
        </CardActions>
      </Card>
    </div>
  )
}

export default MatchRound
