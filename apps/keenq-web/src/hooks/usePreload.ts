import { useEffect } from 'preact/hooks'

import { useMutation, useQuery, UseQueryOptions } from '@/hooks/gql'
import { matchgql, useCurrentMember } from '@/model/member'
import { roomsgql } from '@/model/room'


const roomsOptions = {
	requestPolicy: 'cache-and-network',
	context: {
		additionalTypenames: ['rooms'],
	}
} as UseQueryOptions

export function usePreload() {
	const { id } = useCurrentMember()

	const [{ fetching: roomsFetching }] = useQuery(roomsgql, null, roomsOptions)
	const [{ fetching: matchFetching }, match] = useMutation(matchgql)

	useEffect(() => {
		match({ id })
	}, [ id ])

	return roomsFetching || matchFetching
}
