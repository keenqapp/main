import { useState } from 'react'


import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useApi } from '@/services/api'
import { IResult } from '@/services/results'

import Space from '@/ui/Space'

import ResultsContacts from '@/components/Results/ResultsContacts'
import ResultsResult from '@/components/Results/ResultsResult'

import { formatDate } from '@/utils/formatters'

interface Props {
  uid: string
  results: IResult[]
}

function ResultsEvent({ uid, results }: Props) {
  const [ open, setOpen ] = useState<string|null>(null)
  const setMenuOpen = (open: string | null) => () => setOpen(open)

  const api = useApi()

  const event = api.events.getByUid(uid)
  if (!event) return null
  const { title, startDate, location: { city, place } } = event

  return (
    <div data-testid='ResultEvent'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body2'>{formatDate(startDate.toDate(), { to: 'dd MMM yyyy' })} in {city} / {place}</Typography>
      </Stack>
      <Space />
      <Stack spacing={2}>
        {results.map((result) => <ResultsResult key={result.uid} {...result} onContact={setOpen} />)}
      </Stack>
      <ResultsContacts uid={open} open={!!open} toggleMenuOpen={setMenuOpen} />
    </div>
  )
}

export default ResultsEvent
