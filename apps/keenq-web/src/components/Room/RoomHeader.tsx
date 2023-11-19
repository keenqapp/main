import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { $isPersonal } from '@/model/room'
import { useCurrentRoom } from '@/model/room/hooks'

import Stack from '@/ui/Stack'


const RoomHeaderContainer = styled(Stack)`
	height: var(--vertical-space);
	padding: 0 1rem 2px;
	width: 100vw;
`

const NoWrap = styled(Typography)`
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
	max-width: calc(100% - 2rem); // 40px - avatar width
`

const Info = styled(Stack)`
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
	const { t } = useTranslate()
	const { open } = useModal('room')
	const { room, membersCount, isBanned } = useCurrentRoom()
	const { id, verified, image, name } = room

	const isPersonal = $isPersonal(room)

	const navigate = useNavigate()
	const onBack = () => navigate('/room')

	const onMenuClick = () => !isBanned && open()
	const onNameClick = () => {
		if (isBanned) return
		if (isPersonal) navigate(`/match/${id}`)
		else navigate(`/room/${id}/info`)
	}

	return (
		<RoomHeaderContainer gap={0.5} data-testid='RoomHeader'>
			<IconButton color='primary' onClick={onBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Info gap={0.5} onClick={onNameClick} justify='start'>
				<StyledAvatar src={image?.url} alt={name} />
				<Wrap>
					<Stack gap={0.5} justify='start'>
						<NoWrap variant='h6'>{name}</NoWrap>
						{verified && <VerifiedTwoToneIcon color='primary' fontSize='small' />}
					</Stack>
					<Typography variant='body2'>{isPersonal ? 'Online' : membersCount + ' ' + t`room.members`}</Typography>
				</Wrap>
			</Info>
			{!isBanned && <IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>}
		</RoomHeaderContainer>
	)
}

export default RoomHeader
