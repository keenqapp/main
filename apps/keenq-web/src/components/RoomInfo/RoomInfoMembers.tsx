import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Column from '@/ui/Column'
import List from '@/ui/List'
import Row from '@/ui/Row'

import { useQuery } from '@/hooks/gql'
import { getAvatar, IMember, membersgql } from '@/model/member'
import { useCurrentRoom } from '@/model/room'


const RoomInfoMembersContainer = styled(Column)`
	flex: 1 0 auto;
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberContainer = styled(Row)`
	padding: 0 2rem;
`

function Member(member: IMember) {
	const { id, name } = member
	const avatar = getAvatar(member)
	const { onOpen } = useModal('roomInfoMember')
	const { adminsIds } = useCurrentRoom()
	const isAdmin = adminsIds.includes(id)
	const onClick = () => onOpen({ id })
	return (
		<MemberContainer justify='start' gap={1} onClick={onClick}>
			<Avatar src={avatar?.url} alt={name} />
			<Column>
				<Typography variant='h6'>{name}</Typography>
				{isAdmin && <Typography variant='body2'>admin</Typography>}
			</Column>
		</MemberContainer>
	)
}

function RoomInfoMembers() {
	const { membersIds } = useCurrentRoom()
	const [ result ] = useQuery(membersgql, { ids: membersIds })
	return (
		<RoomInfoMembersContainer data-testid='RoomInfoMembers'>
			<MembersList
				data={result.data?.members || []}
				render={Member}
			/>
		</RoomInfoMembersContainer>
	)
}

export default RoomInfoMembers
