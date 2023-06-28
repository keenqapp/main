import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'


const RoomInfoContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
`

const infoPrivate = {
	name: 'Patrisia',
	image: 'https://i.pravatar.cc/200?img=5',

}

const infoPublic = {
	uid: 'public',
	name: 'SaveSpace',
	image: 'https://picsum.photos/200/200',
}

const infoChannel = {
	uid: 'keenq',
	name: 'keenq',
	image: 'https://keenq.fra1.cdn.digitaloceanspaces.com/rooms/keenq_white.png',
	verified: true,
}

function RoomHeader() {
	const { uid } = useParams()
	const { onOpen } = useModal('room')
	const { name, image, verified } = infoChannel

	const navigate = useNavigate()
	const onBack = () => navigate(-1)

	const onMenuClick = () => onOpen()
	const onNameClick = () => navigate(`/match/${uid}`)

	return (
		<RoomInfoContainer gap={0.5} data-testid='RoomHeader'>
			<IconButton color='primary' onClick={onBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={1} onClick={onNameClick}>
				<Avatar src={image} alt={name} />
				<div>
					<Row gap={0.5}>
						<Typography variant='h6'>{name}</Typography>
						{verified && <VerifiedTwoToneIcon color='primary' fontSize='small' />}
					</Row>
					<Typography variant='body2'>Online</Typography>
				</div>
			</Row>
			<Space grow />
			<IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomHeader
