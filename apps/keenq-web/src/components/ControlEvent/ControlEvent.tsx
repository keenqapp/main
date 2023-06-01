import { differenceInHours, parseJSON } from 'date-fns'


import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import DoDisturbOnTwoToneIcon from '@mui/icons-material/DoDisturbOnTwoTone'
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IEvent } from '@/services/events'

import Container from '@/ui/Container'
import Space from '@/ui/Space'

import ControlEventTimer from '@/components/ControlEvent/ControlEventTimer'
import ControlMembers from '@/components/ControlEvent/ControlMembers'
import ControlRounds from '@/components/ControlEvent/ControlRounds'

import { formatDate } from '@/utils/formatters'
import { ChangeEvent, useState } from 'react'
import ControlEventActions from '@/components/ControlEvent/ControlEventActions'

interface DurationProps {
  value: number
  onChange: (event: ChangeEvent<{ value: string }>) => void
}

function Duration({ value, onChange }: DurationProps) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="outlined" htmlFor="uncontrolled-native">Rounds duration</InputLabel>
      <NativeSelect
        value={value}
        onChange={onChange}
        input={<OutlinedInput label='Duration' />}
        inputProps={{
          name: 'duration',
          id: 'uncontrolled-native',
        }}
      >
        {Array.from({ length: 60 }, (_, i) => i + 1).map((i) => <option key={i} value={i}>{i} minutes</option>)}
      </NativeSelect>
    </FormControl>
  )
}

type Props = IEvent

function ControlEvent({ uid, title,startDate, members, roundsDuration = 8, status }: Props) {

  const api = useApi()
  const rounds = api.rounds.getForEvent()

  const [ dur, setDur ] = useState(roundsDuration) // TODO Temporary
  const handleDurationChange = (event: ChangeEvent<{ value: string }>) => {
    setDur(Number(event.target.value))
  }

  return (
    <Container data-testid='ControlEvent'>
      <Typography variant='h4'>{title}</Typography>
      <Space />
      <ControlEventActions uid={uid} status={status} />
      <Space />
      <Card>
        <CardContent>
          <Stack direction='row' alignItems='center'>
            <Typography variant='subtitle1'>Start date: </Typography>
            <Space />
            <Typography variant='body2'>{formatDate(startDate.toDate())}</Typography>
            <Space grow />
            <Typography variant='overline'><ControlEventTimer date={startDate.toDate()} /> left</Typography>
          </Stack>
          <Space />
          <Duration value={dur} onChange={handleDurationChange}  />
        </CardContent>
      </Card>
      <Space />
      <ControlMembers members={members} />
      <Space />
      <ControlRounds duration={dur} />
    </Container>
  )
}

export default ControlEvent
