import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { IRoom, useCurrentRoom } from '@/model/room'
import styled from '@emotion/styled'


const Title = styled(Typography)`
	line-height: 1em;
`

function RoomInfoHeader(room: IRoom) {
	const { name, verified } = room

	const navigate = useNavigate()
	const { onOpen } = useModal('roomInfo')

	const { isAdmin } = useCurrentRoom()
	const handleBack = () => navigate(-1)
	const onClick = () => onOpen(room)

	return (
		<Row data-testid='RoomInfoHeader'>
			<IconButton color='primary' onClick={handleBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={0.5}>
				<Title variant='h5'>{name}</Title>
				{verified && <VerifiedTwoToneIcon color='primary' />}
			</Row>
			{isAdmin ? (
				<IconButton onClick={onClick}><MoreVertTwoToneIcon /></IconButton>
			) : (
				<Space width={2.5} />
			)}
		</Row>
	)
}

export default RoomInfoHeader
