import { useMemo } from 'preact/hooks'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/preact'

import { IRoom, roomsgql } from '@/model/room'

import Container from '@/ui/Container'
import List from '@/ui/List'

import PrivateRoomsItem from '@/components/Rooms/PrivateRoomsItem'
import PublicRoomsItem from '@/components/Rooms/PublicRoomsItem'
import RoomsEmpty from '@/components/Rooms/RoomsEmpty'
import RoomsHeader from '@/components/Rooms/RoomsHeader'
import { $showTabs, $tab } from '@/components/Rooms/store'

import { useQuery } from '@/hooks/gql'


const RoomsList = styled(List)`
	gap: 1.5rem
`

const context = {
	additionalTypenames: ['rooms']
}

function RoomsItems(room: IRoom) {
	if (equals(room.type, 'personal')) return <PrivateRoomsItem {...room} />
	return <PublicRoomsItem {...room} />
}

function addKeenq(rooms: IRoom[]) {
	console.log('--- Rooms.tsx:33 -> addKeenq ->', rooms?.excludeById('keenq'))
	return rooms?.length > 1 ? rooms : rooms?.excludeById('keenq')
}

function Rooms() {
	const [ result ] = useQuery(roomsgql, null, { context })
	const showTabs = useStore($showTabs)
	const tab = useStore($tab)

	const data = useMemo(() => {
		const rooms = result.data?.rooms || []
		if (!showTabs) return addKeenq(rooms)
		if (equals(tab, 'personal')) return rooms.filter(room => room.type === 'personal')
		return addKeenq(rooms.filter(room => room.type !== 'personal'))
	}, [ showTabs, tab, result.data ])

	return (
		<Container data-testid='Rooms' horizontal={0} flex>
			<RoomsHeader />
			<RoomsList
				data={data}
				render={RoomsItems}
				empty={RoomsEmpty}
			/>
		</Container>
	)
}

export default Rooms
