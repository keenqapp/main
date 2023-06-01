

import { IEvent } from '@/services/events'

import Container from '@/ui/Container'
import Space from '@/ui/Space'

import MatchMembers from '@/components/Match/MatchMembers'
import MatchRounds from '@/components/Match/MatchRounds'
import MatchWant from '@/components/Match/MatchWant'

type Props = IEvent

function Match({ members, uid }: Props) {
  return (
    <Container data-testid='Match'>
      <MatchWant uid={uid} />
      <Space />
      <MatchMembers members={members} />
      <Space />
      <MatchRounds />
    </Container>
  )
}

export default Match
