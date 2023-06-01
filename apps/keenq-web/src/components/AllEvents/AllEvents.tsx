

import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'

import Container from '@/ui/Container'
import Loadable from '@/ui/Loadable'
import Space from '@/ui/Space'

import AllEvent from '@/components/AllEvents/AllEvent'

function EmptyAllEvents() {
  return (
    <Stack alignItems='center'>
      <Space height={2} />
      <Typography variant='overline'>No further events</Typography>
      <Space height={2} />
    </Stack>
  )
}

function Loader() {
  return (
    <>
      <Skeleton height={97} variant='rounded' />
      <Space height={1} />
      <Skeleton height={97} variant='rounded' />
      <Space height={1} />
      <Skeleton height={97} variant='rounded' />
    </>
  )
}

function AllEvents() {

  const api = useApi()
  const events = api.events.notMyEvents

  return (
    <Container data-testid='AllEvents'>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4'>Events</Typography>
        {/*<Button startIcon={<FilterListTwoToneIcon />} color='secondary'>Filter</Button>*/}
      </Stack>
      <Loadable isLoading={!api.events.initLoaded} loader={<Loader />}>
        <Stack spacing={2}>
          {events.map((event) => (
            <AllEvent key={event.uid} {...event} />
          ))}
          {!events.length && <EmptyAllEvents />}
        </Stack>
      </Loadable>
    </Container>
  )
}

export default AllEvents
