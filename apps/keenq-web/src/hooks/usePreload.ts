import { useEffect } from 'preact/hooks'

import { usePosition } from '@/services/location'

import { matchgql } from '@/model/match/gql'
import { updatemembergql, useCurrentMember } from '@/model/member'
import { roomsgql } from '@/model/room'

import { useQuery, UseQueryOptions, useUpdate } from '@/hooks/gql'


const roomsOptions = {
	requestPolicy: 'cache-and-network',
	context: {
		additionalTypenames: ['rooms'],
	}
} as UseQueryOptions

export function usePreload() {
	const { id } = useCurrentMember()
	const { position, permission, getPointAndLocation } = usePosition()

	const [{ fetching: roomsFetching }] = useQuery(roomsgql, null, roomsOptions)
	const [{ fetching: matchFetching, data }, match] = useQuery(matchgql, { id }, { pause: true })
	const [ _, update ] = useUpdate(updatemembergql)

	useEffect(() => {
		if (id && !matchFetching && !data) match()
	}, [ id, matchFetching, data ])

	useEffect(() => {
		if (!position || permission !== 'granted') return
		const pl = getPointAndLocation()
		update(id, pl)
	}, [ position ])

	return roomsFetching || matchFetching
}
