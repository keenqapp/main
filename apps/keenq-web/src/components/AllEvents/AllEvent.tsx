import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { IEvent } from '@/services/events'

import { formatDate } from '@/utils/formatters'



const StyledCardContent = styled(CardContent)`
  padding: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)} !important;
  padding-top: ${({ theme }) => theme.spacing(1)} !important;
`

const sd = 'The pit is full of emptiness.'

const Image = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.spacing(2)};
  object-fit: cover;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

const Item = styled(Grid)`
  display: flex;
`

type Props = IEvent

const AllEvent: FC<Props> = ({ uid, title, coverImage, shortDescription = sd, startDate, location }) => {
  return (
    <Link to={`/events/${uid}`}>
      <Card>
        <StyledCardContent>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Image src={coverImage} />
            </Grid>
            <Item item xs={8}>
              <Content>
                <Typography variant='subtitle1'>{title}</Typography>
                <Typography>{shortDescription}</Typography>
                <Typography variant='body2' align='right'>{`${formatDate(startDate.toDate())} at ${location.city}`}</Typography>
              </Content>
            </Item>
          </Grid>
        </StyledCardContent>
      </Card>
    </Link>
  )
}

export default AllEvent
