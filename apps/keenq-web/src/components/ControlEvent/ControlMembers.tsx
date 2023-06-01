import { useState } from 'react'
import styled from '@emotion/styled'


import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IEvent } from '@/services/events'

import Container from '@/ui/Container'
import Space from '@/ui/Space'

import ControlMember from '@/components/ControlEvent/ControlMember'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

type Props = Pick<IEvent, 'members'>

function ControlMembers({ members }: Props) {
  const [ expanded, setExpanded ] = useState(false)
  const handleExpand = () => setExpanded(prev => !prev)
  const api = useApi()

  return (
    <Container data-testid='ControlMembers'>
      <Stack direction='row' alignItems='center' onClick={handleExpand}>
        <Typography variant='h4'>Members</Typography>
        <Typography variant='overline'>{members?.length} people</Typography>
        <Space grow />
        <ExpandMore expand={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded}>
        <Stack spacing={2}>
          {members?.map(({ uid }) => <ControlMember key={uid} uid={uid} />)}
        </Stack>
      </Collapse>
    </Container>
  )
}

export default ControlMembers
