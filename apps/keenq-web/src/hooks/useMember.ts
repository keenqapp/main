import { IMember, membergql } from '@/model/member'

import { useQuery } from '@/hooks/gql'


export function useMember(id?: string): IMember {
	const [ result ] = useQuery(membergql, { id })
	return result.data?.members_by_pk || {} as IMember
}
