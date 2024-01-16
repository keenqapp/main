import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { useModal } from '@/services/modals'

import { getAvatar, useCurrentMember } from '@/model/member'
import { useCurrentRoom } from '@/model/room/hooks'
import { othermemberinprivategql } from '@/model/rooms_members'

import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import { useQuery } from '@/hooks/gql'


const RoomInfoContainer = styled(Stack)`
	height: var(--space);
  padding: 4px 1rem 4px;
`

function PersonalRoomHeader() {
	const { open } = useModal('room')
	const { room } = useCurrentRoom()
	const { id: mid } = useCurrentMember()
	const { id: rid, verified } = room

	const [ mresult ] = useQuery(othermemberinprivategql, { rid, mid })
	const member = mresult.data?.rooms_members[0].member || {}
	const { id, name } = member
	const avatar = getAvatar(member)

	const navigate = useNavigate()
	const onBack = () => navigate(-1)

	const onMenuClick = () => open()
	const onNameClick = () => navigate(`/match/${id}`)

	return (
		<RoomInfoContainer gap={0.5} data-testid='PersonalRoomHeader'>
			<IconButton color='primary' onClick={onBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Stack gap={1} onClick={onNameClick}>
				<Avatar src={avatar?.url} alt={name} />
				<div>
					<Stack gap={0.5}>
						<Typography variant='h6'>{name}</Typography>
						{verified && <VerifiedTwoToneIcon color='primary' fontSize='small' />}
					</Stack>
					{/*<Typography variant='body2'>{'Status'}</Typography>*/}
				</div>
			</Stack>
			<Space grow />
			<IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default PersonalRoomHeader
