import groupBy from 'lodash/groupBy'


import { useApi } from '@/services/api'

import Container from '@/ui/Container'

import ResultsEvent from '@/components/Results/ResultsEvent'


interface Props {}

function ResultsEvents() {
  const api = useApi()

  const results = api.results.getByTo()
  const events = groupBy(results, 'eventUid')

  return (
    <Container data-testid='ResultsEvents'>
      {Object.entries(events).map(([uid, results]) => <ResultsEvent key={uid} uid={uid} results={results} />)}
    </Container>
  )
}

export default ResultsEvents
