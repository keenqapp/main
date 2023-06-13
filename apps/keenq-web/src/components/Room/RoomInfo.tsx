import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'
import Space from '@/ui/Space'


const RoomInfoContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
	position: relative;
`

const Fade = styled.div`
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
	width: 100%;
	position: absolute;
	left: 0;
	bottom: -1rem;
	height: 1rem;
`

const info = {
	name: 'Patrisia',
	image: 'https://i.pravatar.cc/200?img=5',
}

function RoomInfo() {
	const { uid } = useParams()
	const data = info

	const navigate = useNavigate()
	const handleBack = () => navigate(-1)

	return (
		<RoomInfoContainer gap={0.5} data-testid='RoomInfo'>
			<Fade />
			<IconButton color='primary' onClick={handleBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={1}>
				<Avatar src={data.image} alt={data.name} />
				<div>
					<Typography variant='h6'>{data.name}</Typography>
					<Typography variant='body2'>Online</Typography>
				</div>
			</Row>
			<Space grow />
			<IconButton><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomInfo
