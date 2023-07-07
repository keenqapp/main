import { useQuery } from 'urql'

import { IMember, membergql } from '@/model/member'


export function useMember(id?: string): IMember {
	if (!id) return {} as IMember
	const [ { data } ] = useQuery({ query: membergql, variables: { id } })
	return data?.members_by_pk || {} as IMember
}
