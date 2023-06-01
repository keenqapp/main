import { useState } from 'react'


import CasinoTwoToneIcon from '@mui/icons-material/CasinoTwoTone'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'

import Container from '@/ui/Container'
import Expand from '@/ui/Expand'
import Space from '@/ui/Space'

import ControlRound from '@/components/ControlEvent/ControlRound'

type Props = {
  duration: number
}

function ControlRounds({ duration }: Props) {
  const [ expanded, setExpanded ] = useState(false)
  const handleExpand = () => setExpanded(prev => !prev)

  const api = useApi()

  const rounds = api.rounds.getForEvent()

  const handleAddRound = () => api.rounds.create()

  return (
    <Container data-testid='ControlRounds'>
      <Stack direction='row' alignItems='center' onClick={handleExpand}>
        <Typography variant='h4'>Rounds</Typography>
        <Typography variant='overline'>{rounds?.length} exist</Typography>
        <Space grow />
        <Expand expanded={expanded} />
      </Stack>
      <Collapse in={expanded}>
        <Stack spacing={2}>
          {rounds?.map((round) => <ControlRound key={round.uid} duration={duration} {...round} />)}
        </Stack>
        <Space height={2} />
        <Button
          variant='outlined'
          fullWidth
          onClick={handleAddRound}
          startIcon={<CasinoTwoToneIcon />}
        >Add round</Button>
      </Collapse>
    </Container>
  )
}

export default ControlRounds
