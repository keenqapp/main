import Stack from '@mui/material/Stack'

import { useApi } from '@/services/api'
import { IPair } from '@/services/rounds'

import EmptyMatchPairMember from '@/components/Match/EmptyMatchPairMember'
import MatchPairMember from '@/components/Match/MatchPairMember'

type Props = IPair

function MatchPair({ uid, members: membersIds }: Props) {

  const api = useApi()
  const members = api.members.getByIds(membersIds.filter(uid => uid !== api.user.uid))

  return (
    <Stack data-testid='MatchPair' spacing={2}>
      {members.map(member => <MatchPairMember key={member.uid} pairUid={uid} {...member} />)}
      {!members.length && <EmptyMatchPairMember />}
    </Stack>
  )
}

export default MatchPair
