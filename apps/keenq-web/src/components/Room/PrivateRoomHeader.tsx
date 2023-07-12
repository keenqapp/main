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

import { useQuery } from '@/hooks/gql'
import { getAvatar, useCurrentMember } from '@/model/member'
import { useCurrentRoom } from '@/model/room/hooks'
import { othermemberinprivategql } from '@/model/rooms_members'


const RoomInfoContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
`

function RoomHeader() {
	const { onOpen } = useModal('room')
	const { room } = useCurrentRoom()
	const { id: mid } = useCurrentMember()
	const { id: rid, verified } = room

	const [ mresult ] = useQuery(othermemberinprivategql, { rid, mid })
	const member = mresult.data?.rooms_members[0].member || {}
	const { name } = member
	const avatar = getAvatar(member)

	const navigate = useNavigate()
	const onBack = () => navigate(-1)

	const onMenuClick = () => onOpen()
	const onNameClick = () => navigate(`/match/${mid}`)

	return (
		<RoomInfoContainer gap={0.5} data-testid='RoomHeader'>
			<IconButton color='primary' onClick={onBack}><ArrowBackIosTwoToneIcon /></IconButton>
			<Row gap={1} onClick={onNameClick}>
				<Avatar src={avatar?.url} alt={name} />
				<div>
					<Row gap={0.5}>
						<Typography variant='h6'>{name}</Typography>
						{verified && <VerifiedTwoToneIcon color='primary' fontSize='small' />}
					</Row>
					<Typography variant='body2'>{'Status'}</Typography>
				</div>
			</Row>
			<Space grow />
			<IconButton onClick={onMenuClick}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomHeader
