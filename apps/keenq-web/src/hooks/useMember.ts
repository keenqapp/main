import { useQuery } from 'urql'

import { IMember, membergql } from '@/model/member'


export function useMember(uid: string): IMember {
	const [ { data } ] = useQuery({ query: membergql, variables: { uid } })
	return data?.members_by_pk || {} as IMember
}
