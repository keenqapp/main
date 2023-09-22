import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'

import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import Stack from '@/ui/Stack'

import { IRoom } from '@/model/room'


const RoomItemContainer = styled.div`
	padding: 0 2rem;
`

const NoWrap = styled(Typography)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	max-width: calc(100vw - 5rem - 40px);
	flex: 0 0 auto;
`

const SBadge = styled(Badge)`
	& .MuiBadge-badge {
		border: 1px solid white;
	}
`

function PublicRoomsItem(room: IRoom) {
	const navigate = useNavigate()
	const { id: rid, name, image, description, unread = 0, verified } = room
	const onClick = (id: string) => () => navigate(`/room/${id}`)

	return (
		<RoomItemContainer data-testid='RoomsItem' onClick={onClick(rid)}>
			<Stack justify='start' gap={1}>
				<SBadge badgeContent={unread} color='secondary'>
					<Avatar src={image.url} alt={name} />
				</SBadge>
				<Stack direction='column' align='start'>
					<Stack justify='start' gap={0.5}>
						<NoWrap variant='h6'>{name}</NoWrap>
						{verified && <VerifiedTwoToneIcon fontSize='small' color='primary' />}
					</Stack>
					<NoWrap variant='body2'>{description}</NoWrap>
				</Stack>
			</Stack>
		</RoomItemContainer>
	)
}

export default PublicRoomsItem
