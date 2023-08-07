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

import { $isPersonal } from '@/model/room'
import { useCurrentRoom } from '@/model/room/hooks'


const RoomHeaderContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
	width: 100vw;
`

const NoWrap = styled(Typography)`
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	width: calc(100% - 2rem); // 40px - avatar width
`

const Info = styled(Row)`
	flex: 1 1 auto;
  min-width: 0;
`

const Wrap = styled.div`
	width: 100%;
`

const StyledAvatar = styled(Avatar)`
	width: 2rem;
	height: 2rem;
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
		<RoomHeaderContainer gap={0.5} data-testid='RoomHeader'>
			<IconButton color='primary' onClick={onBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Info gap={0.5} onClick={onNameClick} justify='start'>
				<StyledAvatar src={image?.url} alt={name} />
				<Wrap>
					<Row gap={0.5}>
						<NoWrap variant='h6'>{name}</NoWrap>
						{verified && <VerifiedTwoToneIcon color='primary' fontSize='small' />}
					</Row>
					<Typography variant='body2'>{isPersonal ? 'Online' : `${membersCount} members`}</Typography>
				</Wrap>
			</Info>
			{/*<Space grow />*/}
			<IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>
		</RoomHeaderContainer>
	)
}

export default RoomHeader
