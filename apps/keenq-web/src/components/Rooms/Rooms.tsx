import styled from '@emotion/styled'

import Container from '@/ui/Container'
import List from '@/ui/List'
import Space from '@/ui/Space'

import { rooms } from '@/components/Rooms/rooms.mock'
import RoomsItem from '@/components/Rooms/RoomsItem'


const RoomsList = styled(List)`
	gap: 1.5rem
`

function Rooms() {
	const data = rooms
	return (
		<Container data-testid='Rooms' horizontal={0} flex>
			<Space />
			<RoomsList
				data={data}
				render={RoomsItem}
			/>
		</Container>
	)
}

export default Rooms
