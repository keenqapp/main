import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'


const RoomInfoContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
`


function RoomsHeader() {
	const { onOpen } = useModal('rooms')
	return (
		<RoomInfoContainer data-testid='RoomsHeader' justify='end'>
			<IconButton onClick={onOpen}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomsHeader
