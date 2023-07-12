import styled from '@emotion/styled'

import PrivateRoomHeader from '@/components/Room/PrivateRoomHeader'
import RoomHeader from '@/components/Room/RoomHeader'
import RoomInput from '@/components/Room/RoomInput'
import PersonalMessages from '@/components/Room/RoomMessages'

import { $isPrivate, useCurrentRoom } from '@/model/room'


const StyledContainer = styled.div`
	height: calc(100vh - var(--appbar-height) - var(--vertical-space));
	//display: flex;
	//flex-direction: column;
	//justify-content: stretch;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr auto;
`

function Room() {
	const { room } = useCurrentRoom()
	const isPrivate = $isPrivate(room)

	return (
		<StyledContainer data-testid='Room'>
			{isPrivate ? <PrivateRoomHeader /> : <RoomHeader />}
			<PersonalMessages />
			<RoomInput />
		</StyledContainer>
	)
}

export default Room
