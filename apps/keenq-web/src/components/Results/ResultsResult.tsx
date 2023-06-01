

import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import FreeBreakfastTwoToneIcon from '@mui/icons-material/FreeBreakfastTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IResult } from '@/services/results'

import Space from '@/ui/Space'

type Props = IResult & { onContact: (uid: string) => void }

function ResultsResult({ from, reaction, onContact }: Props) {

  const api = useApi()
  const member = api.members.getByUid(from)
  if (!member) return null

  const { avatar, name, uid } = member

  const handleContact = () => onContact(uid)

  return (
    <div data-testid='ResultsResult'>
      <Card>
        <CardContent>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Avatar src={avatar} />
            <Typography variant='subtitle1'>{name}</Typography>
            <Space grow />
            {reaction === 'romantic' && <FavoriteBorderTwoToneIcon color='primary' fontSize="large" />}
            {reaction === 'meet' && <FreeBreakfastTwoToneIcon color='secondary' fontSize="large" />}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            startIcon={<SendTwoToneIcon />}
            fullWidth
            onClick={handleContact}
          >Contact with</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default ResultsResult
