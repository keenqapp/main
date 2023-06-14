import Container from '@/ui/Container'

import RoomInfo from '@/components/Room/RoomInfo'
import RoomInput from '@/components/Room/RoomInput'
import RoomMessages from '@/components/Room/RoomMessages'


function Room() {
	return (
		<Container data-testid='Room' flex={1} horizontal={0}>
			<RoomInfo />
			<RoomMessages />
			<RoomInput />
		</Container>
	)
}

export default Room
