import styled from '@emotion/styled'


import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { IEvent } from '@/services/events'

import BottomAppbar from '@/ui/BottomAppbar'
import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import EventActions from '@/components/Event/EventActions'
import EventAddress from '@/components/Event/EventAddress'

import { formatDate, formatLocation } from '@/utils/formatters'

const Image = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.spacing(2)};
  object-fit: cover;
`

type Props = IEvent

function Event({ uid, title, coverImage, description, location, startDate }: Props) {
  return (
    <Container data-testid={`Event-${uid}`}>
      <Typography variant='h4'>{title}</Typography>
      <Space />
      <Image src={coverImage} />
      <Space />
      <div>
        <Row justify='start'>
          <ExploreTwoToneIcon />
          <Space width={0.5} />
          <Typography variant='subtitle1'>{formatLocation(location)}</Typography>
        </Row>
        <Space />
        {location.address && <><EventAddress location={location} /><Space /></>}
        <Row justify='start'>
          <DateRangeTwoToneIcon />
          <Space width={0.5} />
          <Typography variant='subtitle1'>{formatDate(startDate.toDate())}</Typography>
        </Row>
      </div>
      <Space />
      <Card>
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
      <Space />
      <BottomAppbar>
        <EventActions uid={uid} />
      </BottomAppbar>
    </Container>
  )
}

export default Event
