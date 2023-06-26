import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Column from '@/ui/Column'
import List from '@/ui/List'
import Row from '@/ui/Row'

import { useIsAdmin } from '@/hooks/useIsAdmin'
import { IMember } from '@/model/member'
import { IRoom } from '@/types/room'


const RoomInfoMembersContainer = styled(Column)`
	flex: 1 0 auto;
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberContainer = styled(Row)`
	padding: 0 2rem;
`


function Member({ uid, name, image }: IMember) {
	const { onOpen } = useModal('roomInfoMember')
	const admin = useIsAdmin(uid)
	const onClick = () => onOpen({ uid })
	return (
		<MemberContainer justify='start' gap={1} onClick={onClick}>
			<Avatar src={image} />
			<Column>
				<Typography variant='h6'>{name}</Typography>
				{admin && <Typography variant='body2'>admin</Typography>}
			</Column>
		</MemberContainer>
	)
}

function RoomInfoMembers({ members }: IRoom) {
	return (
		<RoomInfoMembersContainer data-testid='RoomInfoMembers'>
			<MembersList
				data={members}
				render={Member}
			/>
		</RoomInfoMembersContainer>
	)
}

export default RoomInfoMembers
