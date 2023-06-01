import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone'
import Typography from '@mui/material/Typography'

import { IEvent } from '@/services/events'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

type Props = Pick<IEvent, 'location'>

function EventAddress({ location: { address, url } }: Props) {
  return (
    <Row data-testid='EventAddress' justify='start'>
      <PinDropTwoToneIcon />
      <Space width={0.5} />
      {url
        ? <a href={url}><Typography variant='subtitle1'>{address}</Typography></a>
        : <Typography variant='subtitle1'>{address}</Typography>}
    </Row>
  )
}

export default EventAddress
