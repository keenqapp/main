import { useStore } from '@nanostores/preact'

import { $id } from '@/services/auth'

import { useQuery } from '@/hooks/gql'
import { currentmembergql, IMember } from '@/model/member'


const context = {
	additionalTypenames: ['members'],
}

export function useCurrentMember(): IMember {
	const id = useStore($id)
	const [ result ] = useQuery(currentmembergql, { id }, { context })
	return result.data?.members_by_pk || {} as unknown as IMember
}
