import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Space from '@/ui/Space'

function MatchPairMember() {
  return (
    <Card data-testid='MatchPairMember'>
      <CardContent>
        <Stack alignItems='center' justifyContent='center'>
          <Space />
          <Typography variant='body2'>It is empty slot. Rest for now.</Typography>
          <Space />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MatchPairMember
