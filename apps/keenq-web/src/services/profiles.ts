import { useEffect } from 'preact/hooks'
import { gql, useMutation, useQuery } from '@apollo/client'
import { computed, effect, signal } from '@preact/signals'

import { authError } from '@/services/auth'

const profilesGql = gql`
  query Profiles($uids: [String!]) {
  	profiles(where: { uid: { _in: $uids } }) {
      uid
      name
      description
  	}
  }
`

export function useProfiles(uids: string[]) {
  const query = useQuery(profilesGql)
  return query
}
