import { useQuery, UseQueryOptions } from '@/hooks/gql'
import { matchgql } from '@/model/match/gql'
import { useCurrentMember } from '@/model/member'
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
	const [{ fetching: matchFetching }] = useQuery(matchgql, { id })

	return roomsFetching || matchFetching
}
