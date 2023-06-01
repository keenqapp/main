import { MouseEvent,useState } from 'react'


import BedtimeTwoToneIcon from '@mui/icons-material/BedtimeTwoTone'
import FemaleTwoToneIcon from '@mui/icons-material/FemaleTwoTone'
import MaleTwoToneIcon from '@mui/icons-material/MaleTwoTone'
import TransgenderTwoToneIcon from '@mui/icons-material/TransgenderTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Collapse } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'

import Container from '@/ui/Container'
import Expand from '@/ui/Expand'
import Space from '@/ui/Space'

interface Props {
  uid: string
}

function MatchWant({ uid }: Props) {
  const [ expanded, setExpanded ] = useState(true)
  const handleExpand = () => setExpanded(prev => !prev)

  const api = useApi()
  const { status, preferences } = api.events.currentEventMember!

  const handleFriends = (event: MouseEvent<HTMLElement>, newFriends: string[]) => {
    api.events.setPreferences({ friends: newFriends })
  }
  const handleRomantic = (event: MouseEvent<HTMLElement>, newRomantic: string[]) => {
    api.events.setPreferences({ romantic: newRomantic })
  }

  const handleTakeARest = () => api.events.participate( 'inactive')
  const handleContinue = () => api.events.participate( 'active')

  return (
    <Container data-testid='MatchWant'>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='h4'>I Want</Typography>
        <Expand expanded={expanded} onClick={handleExpand} />
      </Stack>
      <Collapse in={expanded}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='overline'>Friends</Typography>
          <ToggleButtonGroup value={preferences.friends} onChange={handleFriends}>
            <ToggleButton value='male' color='primary'><MaleTwoToneIcon /></ToggleButton>
            <ToggleButton value='female' color='primary'><FemaleTwoToneIcon /></ToggleButton>
            <ToggleButton value='other' color='primary'><TransgenderTwoToneIcon /></ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Space />
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='overline'>Romantic</Typography>
          <ToggleButtonGroup value={preferences.romantic} onChange={handleRomantic}>
            <ToggleButton value='male' color='primary'><MaleTwoToneIcon /></ToggleButton>
            <ToggleButton value='female' color='primary'><FemaleTwoToneIcon /></ToggleButton>
            <ToggleButton value='other' color='primary'><TransgenderTwoToneIcon /></ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Space height={2} />
        <Stack alignItems='center'>
          {status === 'active'
            ? (
              <>
                <Typography variant='overline' color='primary'>You are participating now</Typography>
                <Space />
                <Button
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  startIcon={<BedtimeTwoToneIcon />}
                  onClick={handleTakeARest}
                >Take a rest</Button>
              </>
            )
            : (
              <>
                <Typography variant='overline' color='error'>You are not participating now</Typography>
                <Space />
                <Button
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  startIcon={<VisibilityTwoToneIcon />}
                  onClick={handleContinue}
                >Continue</Button>
              </>
            )
          }
        </Stack>
      </Collapse>
    </Container>
  )
}

export default MatchWant
