import { useEffect } from 'react'
import { useStore } from '@nanostores/react'

import { $id, logout } from '@/services/auth'

import { currentmembergql, IMember } from '@/model/member'

import { useQuery } from '@/hooks/gql'


const options = {
	requestPolicy: 'cache-and-network',
	context: {
		additionalTypenames: ['members'],
	}
} as const

export function useCurrentMember(): IMember {
	const id = useStore($id)
	const [ result ] = useQuery(currentmembergql, { id }, options)
	const { data, error, fetching } = result
	useEffect(() => {
		if (error || (!fetching && !data?.members_by_pk)) logout()
	}, [ error ])
	return data?.members_by_pk || {} as unknown as IMember
}
