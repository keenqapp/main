import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import { Avatar } from '@mui/material'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'


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

interface RoomsItemProps {
	uid: string
	name: string
	image: string
	unread: number
	last: string
}

function RoomsItem({ uid, name, image, unread = 0, last }: RoomsItemProps) {
	const navigate = useNavigate()
	const onClick = (uid: string) => () => {
		navigate(`/room/${uid}`)
	}
	return (
		<RoomItemContainer data-testid='RoomsItem' onClick={onClick(uid)}>
			<Row justify='start' gap={1}>
				<SBadge badgeContent={unread} color='secondary'>
					<Avatar src={image} alt={name} />
				</SBadge>
				<Row direction='column' align='start'>
					<NoWrap variant='h6'>{name}</NoWrap>
					<NoWrap variant='body2'>{last}</NoWrap>
				</Row>
			</Row>
		</RoomItemContainer>
	)
}

export default RoomsItem
