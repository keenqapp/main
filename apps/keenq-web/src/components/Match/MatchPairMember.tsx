import { MouseEvent, useState } from 'react'
import styled from '@emotion/styled'


import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import FreeBreakfastTwoToneIcon from '@mui/icons-material/FreeBreakfastTwoTone'
import { Avatar } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IMember } from '@/services/members'
import { IResult } from '@/services/results'

import Space from '@/ui/Space'

const StyledGroup = styled(ToggleButtonGroup)`
  flex: 1;
  justify-content: stretch;
`
const StyledButton = styled(ToggleButton)`
  flex: 1;
`

type Props = IMember & { pairUid: string }

function MatchPairMember({ uid, name, avatar }: Props) {

  const api = useApi()

  const result = api.results.getByMemberUid(uid)

  const handleReactions = (event: MouseEvent<HTMLElement>, reaction: IResult['reaction']) => api.results.react({ to: uid, reaction })

  return (
    <Card data-testid='MatchPairMember'>
      <CardContent>
        <Stack direction='row' alignItems='center'>
          <Avatar src={`${avatar}?img=${uid}`} alt={name} />
          <Space />
          <Typography variant='subtitle1'>{name}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <StyledGroup value={result?.reaction || ''} onChange={handleReactions} exclusive>
          <StyledButton value='romantic' color='primary'><FavoriteBorderTwoToneIcon /></StyledButton>
          <StyledButton value='meet' color='secondary'><FreeBreakfastTwoToneIcon /></StyledButton>
          <StyledButton value='decline' color='warning'><CloseTwoToneIcon /></StyledButton>
        </StyledGroup>
      </CardActions>
    </Card>
  )
}

export default MatchPairMember
