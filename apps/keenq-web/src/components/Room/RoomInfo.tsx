import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import { Avatar } from '@mui/material'
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

function RoomInfo() {
	const { uid } = useParams()
	const { onOpen } = useModal('room')
	const data = uid === 'public' ? infoPublic : infoPrivate

	const navigate = useNavigate()
	const handleBack = () => navigate(-1)

	const onMenuClick = () => onOpen()

	return (
		<RoomInfoContainer gap={0.5} data-testid='RoomInfo'>
			<IconButton color='primary' onClick={handleBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={1}>
				<Avatar src={data.image} alt={data.name} />
				<div>
					<Typography variant='h6'>{data.name}</Typography>
					<Typography variant='body2'>Online</Typography>
				</div>
			</Row>
			<Space grow />
			<IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomInfo
