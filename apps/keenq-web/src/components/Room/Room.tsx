import styled from '@emotion/styled'

import { useCurrentRoom } from '@/model/room'

import PersonalRoomHeader from '@/components/Room/PersonalRoomHeader'
import RoomBanned from '@/components/Room/RoomBanned'
import RoomBottom from '@/components/Room/RoomBottom'
import RoomHeader from '@/components/Room/RoomHeader'
import PersonalMessages from '@/components/Room/RoomMessages'


const StyledContainer = styled.div`
	//height: calc(100 * var(--vh) - var(--appbar-height) - var(--vertical-space));
	display: flex;
	flex-direction: column;
	flex: 1;
`

function Room() {
	const { isBanned, isPersonal } = useCurrentRoom()
	return (
		<StyledContainer data-testid='Room'>
			{isPersonal
				? <PersonalRoomHeader />
				: <RoomHeader />}
			{isBanned
				? <RoomBanned />
				: (
					<>
						<PersonalMessages />
						<RoomBottom />
					</>
				)}
		</StyledContainer>
	)
}

export default Room
