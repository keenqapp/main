import styled from '@emotion/styled'

import { useApi } from '@/services/api'
import Container from '@/ui/Container'
import ResultsEvents from '@/components/Results/ResultsEvents'

interface Props {}

function Results() {
  const api = useApi()


  return (
    <Container data-testid='Results'>
      <ResultsEvents />
    </Container>
  )
}

export default Results
