import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

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

function RoomsItem({ id, name, image, description, unread = 0, last, verified }: IRoom) {
	const navigate = useNavigate()
	const onClick = (id: string) => () => {
		navigate(`/room/${id}`)
	}
	return (
		<RoomItemContainer data-testid='RoomsItem' onClick={onClick(id)}>
			<Row justify='start' gap={1}>
				<SBadge badgeContent={unread} color='secondary'>
					<Avatar src={image.url} alt={name} />
				</SBadge>
				<Row direction='column' align='start'>
					<Row justify='start' gap={0.5}>
						<NoWrap variant='h6'>{name}</NoWrap>
						{verified && <VerifiedTwoToneIcon fontSize='small' color='primary' />}
					</Row>
					<NoWrap variant='body2'>{last || description}</NoWrap>
				</Row>
			</Row>
		</RoomItemContainer>
	)
}

export default RoomsItem
