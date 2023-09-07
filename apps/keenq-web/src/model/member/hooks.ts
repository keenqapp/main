import { useEffect } from 'preact/hooks'
import { useStore } from '@nanostores/preact'

import { $id, logout } from '@/services/auth'

import { currentmembergql, IMember } from '@/model/member'

import { useQuery } from '@/hooks/gql'


const context = {
	additionalTypenames: ['members'],
}

export function useCurrentMember(): IMember {
	const id = useStore($id)
	const [ result ] = useQuery(currentmembergql, { id }, { context })
	const { data, error, fetching } = result
	useEffect(() => {
		if (error || (!fetching && !data?.members_by_pk)) logout()
	}, [ error ])
	return data?.members_by_pk || {} as unknown as IMember
}
