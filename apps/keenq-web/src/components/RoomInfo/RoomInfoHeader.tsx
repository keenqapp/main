import { useNavigate } from 'react-router-dom'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { IRoom } from '@/model/room'


function RoomInfoHeader(room: IRoom) {
	const { name, verified } = room

	const navigate = useNavigate()
	const { onOpen } = useModal('roomInfo')

	const { uid: cuid } = useCurrentMember()
	const admin = useIsAdmin(cuid)

	const handleBack = () => navigate(-1)
	const onClick = () => onOpen(room)

	return (
		<Row data-testid='RoomInfoHeader'>
			<IconButton color='primary' onClick={handleBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={0.5}>
				<Typography variant='h5'>{name}</Typography>
				{verified && <VerifiedTwoToneIcon color='primary' />}
			</Row>
			{admin ? (
				<IconButton onClick={onClick}><MoreVertTwoToneIcon /></IconButton>
			) : (
				<Space width={2.5} />
			)}
		</Row>
	)
}

export default RoomInfoHeader
