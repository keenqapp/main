import { useQuery, UseQueryOptions } from '@/hooks/gql'
import { roomsgql } from '@/model/room'


const roomsOptions = {
	requestPolicy: 'cache-and-network',
	context: {
		additionalTypenames: ['rooms'],
	}
} as UseQueryOptions

export function usePreload() {
	const [{ fetching: roomsFetching }] = useQuery(roomsgql, null, roomsOptions)

	return roomsFetching
}
