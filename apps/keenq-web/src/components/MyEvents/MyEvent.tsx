import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { IEvent } from '@/services/events'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { formatDate } from '@/utils/formatters'

const StyledCard = styled(Card)<{ image?: string }>`
  background-image: url(${p => p.image});
  aspect-ratio: 4 / 3;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border-radius: ${({ theme }) => theme.spacing(2)};
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%);
`

const StyledCardContent = styled(CardContent)`
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)} !important;
  padding-top: ${({ theme }) => theme.spacing(1)} !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  color: white;
`

type Props = IEvent

const MyEvent: FC<Props> = ({ uid, title, coverImage, startDate, location }) => {
  return (
    <Link to={`/events/${uid}`}>
      <StyledCard image={coverImage}>
        <Overlay />
        <StyledCardContent>
          <Row justify='start'>
            <ExploreTwoToneIcon fontSize='small' />
            <Space width={0.5} />
            <Typography color={'rgba(255,255,255,0.75)'} variant='overline'>{location.place}</Typography>
          </Row>
          <Typography variant='h6'>{title}</Typography>
          <Row justify='end'>
            <Typography variant='body2' align='right'>{formatDate(startDate.toDate())}</Typography>
            <Space width={0.5} />
            <DateRangeTwoToneIcon fontSize='small' />
          </Row>
        </StyledCardContent>
      </StyledCard>
    </Link>
  )
}

export default MyEvent
