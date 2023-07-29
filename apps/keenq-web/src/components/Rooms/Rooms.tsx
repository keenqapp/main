import styled from '@emotion/styled'

import Container from '@/ui/Container'
import List from '@/ui/List'
import Space from '@/ui/Space'

import PrivateRoomsItem from '@/components/Rooms/PrivateRoomsItem'
import PublicRoomsItem from '@/components/Rooms/PublicRoomsItem'
import RoomsEmpty from '@/components/Rooms/RoomsEmpty'

import { useQuery } from '@/hooks/gql'
import { $isPrivate, IRoom, roomsgql } from '@/model/room'


const RoomsList = styled(List)`
	gap: 1.5rem
`

const context = {
	additionalTypenames: ['rooms']
}

function RoomsItems(room: IRoom) {
	const isPrivate = $isPrivate(room)
	return isPrivate
		? PrivateRoomsItem(room)
		: PublicRoomsItem(room)
}

function Rooms() {
	const [ result ] = useQuery(roomsgql, null, { context })
	const data =  result.data?.rooms && result.data?.rooms.length > 1
		? result.data?.rooms
		: result.data?.rooms.excludeById('keenq')
	return (
		<Container data-testid='Rooms' horizontal={0} flex>
			<Space />
			<RoomsList
				data={data}
				render={RoomsItems}
				empty={RoomsEmpty}
			/>
		</Container>
	)
}

export default Rooms
