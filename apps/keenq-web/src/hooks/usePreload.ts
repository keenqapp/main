import { useEffect } from 'preact/hooks'

import { usePosition } from '@/services/location'
import { usePushes } from '@/services/notifications'

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

function cache(images: string[]) {
	images.forEach(i => {
		const img = new Image()
		img.src = i
	})
}

export function usePreload() {
	const { id } = useCurrentMember()
	const { position, permission, getPointAndLocation } = usePosition()
	usePushes()

	const [{ fetching: roomsFetching }] = useQuery(roomsgql, null, roomsOptions)
	const [{ fetching: matchFetching, data, error }, match] = useQuery(matchgql, { id, offset: 0 })
	const [ _, update ] = useUpdate(updatemembergql)

	useEffect(() => {
		if (data?.match?.success !== true) return
		const images = data?.match?.data?.map(i => i.images).flat().map(i => i.url) || []
		cache(images)
	}, [ data ])

	useEffect(() => {
		if (id && !matchFetching && !data && !error) match()
	}, [ id, matchFetching, data ])

	useEffect(() => {
		if (!position || permission !== 'granted') return
		const pl = getPointAndLocation()
		update(id, pl)
	}, [ position ])

	return roomsFetching || matchFetching
}
