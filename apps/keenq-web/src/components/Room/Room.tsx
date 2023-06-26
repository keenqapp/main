import styled from '@emotion/styled'

import RoomHeader from '@/components/Room/RoomHeader'
import RoomInput from '@/components/Room/RoomInput'
import PersonalMessages from '@/components/Room/RoomMessages'


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
	return (
		<StyledContainer data-testid='Room'>
			<RoomHeader />
			<PersonalMessages />
			<RoomInput />
		</StyledContainer>
	)
}

export default Room
