import styled from '@emotion/styled'

import PersonalRoomHeader from '@/components/Room/PersonalRoomHeader'
import RoomHeader from '@/components/Room/RoomHeader'
import RoomInput from '@/components/Room/RoomInput'
import PersonalMessages from '@/components/Room/RoomMessages'

import { $isPersonal, useCurrentRoom } from '@/model/room'


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
	const isPersonal = $isPersonal(room)

	return (
		<StyledContainer data-testid='Room'>
			{isPersonal ? <PersonalRoomHeader /> : <RoomHeader />}
			<PersonalMessages />
			<RoomInput />
		</StyledContainer>
	)
}

export default Room
