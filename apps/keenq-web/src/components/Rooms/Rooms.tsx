import styled from '@emotion/styled'

import Container from '@/ui/Container'
import List from '@/ui/List'
import Space from '@/ui/Space'

import RoomsEmpty from '@/components/Rooms/RoomsEmpty'
import RoomsItem from '@/components/Rooms/RoomsItem'

import { useQuery } from '@/hooks/gql'
import { roomsgql } from '@/model/room'


const RoomsList = styled(List)`
	gap: 1.5rem
`

function Rooms() {
	const [ result ] = useQuery(roomsgql)

	return (
		<Container data-testid='Rooms' horizontal={0} flex>
			<Space />
			<RoomsList
				data={result.data?.rooms || []}
				render={RoomsItem}
				empty={RoomsEmpty}
			/>
		</Container>
	)
}

export default Rooms
