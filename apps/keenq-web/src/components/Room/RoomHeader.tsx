import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { $isPersonal } from '@/model/room'
import { useCurrentRoom } from '@/model/room/hooks'


const RoomInfoContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
`

function RoomHeader() {
	const { onOpen } = useModal('room')
	const { room, membersCount } = useCurrentRoom()
	const { id, verified, image, name } = room

	const isPersonal = $isPersonal(room)

	const navigate = useNavigate()
	const onBack = () => navigate(-1)

	const onMenuClick = () => onOpen()
	const onNameClick = () => {
		if (isPersonal) navigate(`/match/${id}`)
		else navigate(`/room/${id}/info`)
	}

	return (
		<RoomInfoContainer gap={0.5} data-testid='RoomHeader'>
			<IconButton color='primary' onClick={onBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={1} onClick={onNameClick}>
				<Avatar src={image?.url} alt={name} />
				<div>
					<Row gap={0.5}>
						<Typography variant='h6'>{name}</Typography>
						{verified && <VerifiedTwoToneIcon color='primary' fontSize='small' />}
					</Row>
					<Typography variant='body2'>{isPersonal ? 'Online' : `${membersCount} members`}</Typography>
				</div>
			</Row>
			<Space grow />
			<IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomHeader
