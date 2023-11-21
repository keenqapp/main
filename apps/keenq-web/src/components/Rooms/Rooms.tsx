import { useEffect, useMemo } from 'react'
import { useStore } from '@nanostores/react'

import { IRoom, roomsgql } from '@/model/room'

import Container from '@/ui/Container'
import List from '@/ui/List'

import PrivateRoomsItem from '@/components/Rooms/PrivateRoomsItem'
import PublicRoomsItem from '@/components/Rooms/PublicRoomsItem'
import RoomsEmpty from '@/components/Rooms/RoomsEmpty'
import RoomsHeader from '@/components/Rooms/RoomsHeader'
import { $showTabs, $tab } from '@/components/Rooms/store'

import { useQuery } from '@/hooks/gql'


const context = {
	additionalTypenames: ['rooms'],
	requestPolicy: 'cache-and-network',
} as const

function RoomsItems(room: IRoom) {
	if (equals(room.type, 'personal')) return <PrivateRoomsItem {...room} />
	return <PublicRoomsItem {...room} />
}

function addKeenq(rooms: IRoom[]) {
	return rooms?.length > 2 ? rooms : rooms?.excludeById(['keenq', 'keenq_support'])
}

function Rooms() {
	const [ result, load ] = useQuery(roomsgql, null, context)
	const showTabs = useStore($showTabs)
	const tab = useStore($tab)

	useEffect(() => {
		setTimeout(() => load(), 100)
	}, [])

	const data = useMemo(() => {
		const rooms = result.data?.rooms || []
		if (!showTabs) return addKeenq(rooms)
		if (equals(tab, 'personal')) return rooms.filter(room => room.type === 'personal')
		return addKeenq(rooms.filter(room => room.type !== 'personal'))
	}, [ showTabs, tab, result ])

	return (
		<Container data-testid='Rooms' horizontal={0} flex>
			<RoomsHeader />
			<List
				data={data}
				render={RoomsItems}
				empty={RoomsEmpty}
			/>
		</Container>
	)
}

export default Rooms
