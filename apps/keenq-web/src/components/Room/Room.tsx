import styled from '@emotion/styled'

import { useCurrentRoom } from '@/model/room'

import IfElse from '@/ui/IfElse'

import PersonalRoomHeader from '@/components/Room/PersonalRoomHeader'
import RoomBanned from '@/components/Room/RoomBanned'
import RoomBottom from '@/components/Room/RoomBottom'
import RoomHeader from '@/components/Room/RoomHeader'
import PersonalMessages from '@/components/Room/RoomMessages'


const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`

function Room() {
	const { isBanned, isPersonal } = useCurrentRoom()
	return (
		<StyledContainer data-testid='Room'>
			<IfElse cond={isPersonal}>
				<PersonalRoomHeader />
				<RoomHeader />
			</IfElse>
			<IfElse cond={isBanned}>
				<RoomBanned />
				<>
					<PersonalMessages />
					<RoomBottom />
				</>
			</IfElse>
		</StyledContainer>
	)
}

export default Room
