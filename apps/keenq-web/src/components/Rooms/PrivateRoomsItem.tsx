import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'

import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { getAvatar, useCurrentMember } from '@/model/member'
import { getText } from '@/model/message'
import { IRoom } from '@/model/room'
import { othermemberinprivategql } from '@/model/rooms_members'

import Stack from '@/ui/Stack'

import { useQuery } from '@/hooks/gql'
import { useTransition } from 'react'


const RoomItemContainer = styled.div`
  padding: 0.5rem 2rem;
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

function PrivateRoomsItem(room: IRoom) {
	const navigate = useNavigate()
	const { id: rid, unread = 0, verified, lastMessage } = room
	const text = getText(lastMessage)
	const { id: mid } = useCurrentMember()
	const [ mresult ] = useQuery(othermemberinprivategql, { rid, mid })
	const member = mresult.data?.rooms_members[0].member || {}
	const { name } = member
	const avatar = getAvatar(member)

	const onClick = (id: string) => () => navigate(`/room/${id}`)

	return (
		<RoomItemContainer data-testid='RoomsItem' onClick={onClick(rid)}>
			<Stack justify='start' gap={1}>
				<SBadge badgeContent={unread} color='secondary'>
					<Avatar src={avatar?.url} alt={name} />
				</SBadge>
				<Stack direction='column' align='start'>
					<Stack justify='start' gap={0.5}>
						<NoWrap variant='h6'>{name}</NoWrap>
						{verified && <VerifiedTwoToneIcon fontSize='small' color='primary' />}
					</Stack>
					<NoWrap variant='body2'>{text}</NoWrap>
				</Stack>
			</Stack>
		</RoomItemContainer>
	)
}

export default PrivateRoomsItem
