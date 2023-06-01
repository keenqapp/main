

import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { api } from '@/services/api'

import Container from '@/ui/Container'
import Loadable from '@/ui/Loadable'
import Space from '@/ui/Space'

import MyEvent from '@/components/MyEvents/MyEvent'
import Skeleton from '@mui/material/Skeleton'

function EmptyMyEvents() {
  return (
    <Grid item xs={12}>
      <Stack alignItems='center'>
        <Space height={2} />
        <Typography variant='overline'>You are not a member of any event</Typography>
        <Space />
        <Typography variant='overline'>Join now!</Typography>
        <Space />
        <ArrowDownwardTwoToneIcon />
        <Space height={2} />
      </Stack>
    </Grid>
  )
}

function Loader() {
  return (
    <>
      <Grid item xs={6}><Skeleton width={184} height={138} variant='rounded' /></Grid>
      <Grid item xs={6}><Skeleton width={184} height={138} variant='rounded' /></Grid>
    </>
  )
}

function MyEvents() {
  const events = api.events.myEvents
  return (
    <Container data-testid='MyEvents'>
      <Typography variant='h4'>My Events</Typography>
      <Grid container spacing={1}>
        <Loadable isLoading={!api.events.initLoaded} loader={<Loader />}>
          {events.map((event) => (
            <Grid item key={event.uid} xs={6}>
              <MyEvent {...event} />
            </Grid>
          ))}
          {!events.length && <EmptyMyEvents />}
        </Loadable>
      </Grid>
    </Container>
  )
}

export default MyEvents
