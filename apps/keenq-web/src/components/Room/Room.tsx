import { useEffect } from 'preact/hooks'
import styled from '@emotion/styled'

import { $isPersonal, useCurrentRoom } from '@/model/room'

import PersonalRoomHeader from '@/components/Room/PersonalRoomHeader'
import RoomHeader from '@/components/Room/RoomHeader'
import RoomInput from '@/components/Room/RoomInput'
import PersonalMessages from '@/components/Room/RoomMessages'


const StyledContainer = styled.div`
	height: calc(100 * var(--vh) - var(--appbar-height) - var(--vertical-space));
	display: flex;
	flex-direction: column;
`

function Room() {
	const { room } = useCurrentRoom()
	const isPersonal = $isPersonal(room)

	useEffect(() => {
		const vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
		const cb = function () {
			const vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}
		window.addEventListener('resize', cb, true)
		return () => window.removeEventListener('resize', cb, true)
	}, [  ])

	return (
		<StyledContainer data-testid='Room'>
			{isPersonal ? <PersonalRoomHeader /> : <RoomHeader />}
			<PersonalMessages />
			<RoomInput />
		</StyledContainer>
	)
}

export default Room
